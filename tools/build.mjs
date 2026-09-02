#!/usr/bin/env node
/**
 * Content build for the MD-102 lab platform.
 *
 *   node tools/build.mjs              write all generated artifacts
 *   node tools/build.mjs --validate   validate only, write nothing
 *   node tools/build.mjs --check      rebuild in memory, fail if committed artifacts differ
 *   node tools/build.mjs --watch      rebuild on change
 *
 * Zero npm dependencies by design — node: builtins only. The site itself has no
 * build; this pipeline exists so that content/ is the only place a fact lives.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync, watch } from "node:fs";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";

import { validateAll, indexOutline } from "./lib/schema.mjs";
import { computeCoverage, formatCoverage } from "./lib/coverage.mjs";
import { emitBundle } from "./lib/emit-bundle.mjs";
import { emitMarkdown } from "./lib/emit-markdown.mjs";
import { emitReadme } from "./lib/emit-readme.mjs";
import { shuffleLabQuiz } from "./lib/shuffle-quiz.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argv = new Set(process.argv.slice(2));
const MODE = argv.has("--check") ? "check" : argv.has("--validate") ? "validate" : "write";

const COLOR = process.stdout.isTTY && !process.env.NO_COLOR;
const RED = COLOR ? "[31m" : "";
const YELLOW = COLOR ? "[33m" : "";
const GREEN = COLOR ? "[32m" : "";
const DIM = COLOR ? "[2m" : "";
const OFF = COLOR ? "[0m" : "";

/** Import a content module, cache-busted so --watch picks up edits. */
async function load(relPath, bust) {
  const url = pathToFileURL(join(ROOT, relPath)).href + (bust ? "?t=" + bust : "");
  const mod = await import(url);
  return mod.default;
}

async function loadContent(bust) {
  const outline = await load("content/outline.md102.mjs", bust);

  const meta = {};
  for (const name of ["modules", "personas", "vms", "licenses", "errors", "tracks"]) {
    const rel = "content/meta/" + name + ".mjs";
    meta[name] = existsSync(join(ROOT, rel)) ? await load(rel, bust) : [];
  }

  const labsDir = join(ROOT, "content/labs");
  const files = existsSync(labsDir)
    ? (await readdir(labsDir)).filter((f) => f.endsWith(".mjs")).sort()
    : [];

  const labs = [];
  for (const file of files) {
    const lab = await load("content/labs/" + file, bust);
    if (!lab) throw new Error("content/labs/" + file + " has no default export");
    // Display number is derived from the filename prefix, never authored, so
    // reordering the curriculum is a rename and never a data migration.
    const m = /^(\d+)-/.exec(file);
    if (!m) throw new Error("content/labs/" + file + ": filename must start with a number prefix, e.g. 07-my-lab.mjs");
    lab.number = parseInt(m[1], 10);
    lab.sourceFile = "content/labs/" + file;
    // Questions are authored with the correct answer first because that is how
    // anybody drafts one. Shuffling on load means the reader never sees that.
    shuffleLabQuiz(lab);
    labs.push(lab);
  }
  labs.sort((a, b) => a.number - b.number);

  return { outline, meta, labs };
}

/** Copy the shared inline-markup parser into the browser app, exports rewritten. */
async function buildInlineForBrowser() {
  // Normalize BEFORE the indent below, not after. In a JavaScript regular
  // expression a bare carriage return is itself a line terminator, so /^/gm on a
  // CRLF source matches after the CR as well as after the LF and injects a second
  // indent between the two, producing stray two-space lines that a LF checkout
  // never reproduces. Normalizing the finished artifact is too late to undo that.
  const src = normalizeEol(await readFile(join(ROOT, "tools/lib/inline.mjs"), "utf8"));
  const body = src.replace(
    /^export \{[^}]*\};\s*$/m,
    "root.MD102Inline = { esc: esc, toHtml: toHtml, toMarkdown: toMarkdown, toPlain: toPlain, validateInline: validateInline };"
  );
  if (body === src) {
    throw new Error("tools/lib/inline.mjs: could not find the export statement to rewrite");
  }
  return [
    "/*",
    " * GENERATED FILE — DO NOT EDIT.",
    " * Copied from tools/lib/inline.mjs by tools/build.mjs so that the browser and",
    " * the Markdown emitter can never disagree about what the markup means.",
    " */",
    '(function (root) {',
    '  "use strict";',
    body.replace(/^/gm, "  ").trimEnd(),
    '})(typeof window !== "undefined" ? window : globalThis);',
    ""
  ].join("\n");
}

/**
 * Syntax-check the hand-written browser scripts.
 *
 * They are classic scripts, so nothing imports them and nothing would notice a
 * mismatched quote until the page is open and blank. vm.Script parses without
 * executing, which catches exactly that.
 */
async function checkBrowserScripts() {
  const dir = join(ROOT, "js/app");
  if (!existsSync(dir)) return [];
  const errors = [];
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".js")).sort()) {
    const rel = "js/app/" + file;
    try {
      new vm.Script(await readFile(join(ROOT, rel), "utf8"), { filename: rel });
    } catch (err) {
      errors.push(rel + ": " + err.message);
    }
  }
  return errors;
}

/**
 * Force LF line endings on a generated artifact.
 *
 * The site is authored on Windows and built on Linux in CI. Sources arrive CRLF
 * on one and LF on the other, and buildInlineForBrowser copies its source
 * verbatim, so an artifact built on Windows would otherwise carry CR bytes that
 * CI could never reproduce — failing --check over line endings rather than
 * content. Generated files are byte-identical on every platform because of this.
 */
function normalizeEol(body) {
  return String(body).split("\r\n").join("\n").split("\r").join("\n");
}

async function build(bust) {
  const { outline, meta, labs } = await loadContent(bust);

  const { errors, warnings } = validateAll(outline, labs, meta);
  errors.push(...(await checkBrowserScripts()));
  const coverage = computeCoverage(outline, labs);
  const outlineIndex = indexOutline(outline);

  const artifacts = new Map();

  artifacts.set(
    "js/content.bundle.js",
    emitBundle({
      outline,
      modules: meta.modules,
      labs,
      personas: meta.personas,
      vms: meta.vms,
      licenses: meta.licenses,
      errors: meta.errors,
      tracks: meta.tracks,
      coverage
    })
  );

  artifacts.set("js/app/inline.js", await buildInlineForBrowser());

  artifacts.set(
    "LAB_GUIDE.md",
    emitMarkdown({ outline, modules: meta.modules, labs, coverage, outlineIndex })
  );

  const readmePath = join(ROOT, "README.md");
  if (existsSync(readmePath)) {
    const existing = await readFile(readmePath, "utf8");
    artifacts.set("README.md", emitReadme(existing, { outline, modules: meta.modules, labs, coverage }));
  }

  for (const [rel, body] of artifacts) artifacts.set(rel, normalizeEol(body));

  return { outline, meta, labs, coverage, errors, warnings, artifacts };
}

function report(result) {
  const { labs, coverage, errors, warnings } = result;
  const handsOn = labs.filter((l) => l.access === "hands-on").length;
  const minutes = labs.reduce((a, l) => a + (l.estimatedMinutes || 0), 0);

  console.log(
    DIM + "content" + OFF + "  " + labs.length + " labs (" + handsOn + " hands-on, " +
    (labs.length - handsOn) + " walkthrough), ~" + Math.round(minutes / 60) + " h of lab time"
  );
  console.log("");
  console.log(formatCoverage(coverage));
  console.log("");

  for (const w of warnings) console.log(YELLOW + "warn" + OFF + "  " + w);
  for (const e of errors) console.log(RED + "error" + OFF + " " + e);

  if (errors.length) {
    console.log("");
    console.log(RED + errors.length + " validation error(s)." + OFF);
    return false;
  }
  return true;
}

async function main() {
  if (argv.has("--watch")) {
    let running = false;
    const run = async () => {
      if (running) return;
      running = true;
      try {
        const result = await build(Date.now());
        if (report(result)) {
          for (const [rel, body] of result.artifacts) await writeFile(join(ROOT, rel), body, "utf8");
          console.log(GREEN + "built" + OFF + " " + new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.error(RED + String(err && err.stack ? err.stack : err) + OFF);
      }
      running = false;
    };
    await run();
    for (const dir of ["content", "tools"]) {
      watch(join(ROOT, dir), { recursive: true }, () => setTimeout(run, 60));
    }
    console.log(DIM + "watching content/ and tools/ …" + OFF);
    return;
  }

  const result = await build();
  const ok = report(result);
  if (!ok) process.exit(1);

  if (MODE === "validate") {
    console.log(GREEN + "validate: ok" + OFF);
    return;
  }

  if (MODE === "check") {
    const stale = [];
    for (const [rel, body] of result.artifacts) {
      const abs = join(ROOT, rel);
      const current = existsSync(abs) ? normalizeEol(await readFile(abs, "utf8")) : null;
      if (current !== body) stale.push(rel);
    }
    if (stale.length) {
      console.log(RED + "check: generated artifacts are out of date:" + OFF);
      for (const s of stale) console.log("  - " + s);
      console.log("");
      console.log("Run " + DIM + "npm run build" + OFF + " and commit the result.");
      process.exit(1);
    }
    console.log(GREEN + "check: all generated artifacts are up to date" + OFF);
    return;
  }

  for (const [rel, body] of result.artifacts) {
    await writeFile(join(ROOT, rel), body, "utf8");
    console.log(GREEN + "wrote" + OFF + " " + rel + DIM + " (" + (body.length / 1024).toFixed(1) + " KB)" + OFF);
  }
}

main().catch((err) => {
  console.error(RED + String(err && err.stack ? err.stack : err) + OFF);
  process.exit(1);
});
