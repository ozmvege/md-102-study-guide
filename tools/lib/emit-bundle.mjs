/**
 * Emit js/content.bundle.js — the single file the browser loads for all content.
 *
 * Deliberate choices:
 *  - A classic script assigning to `window`, not an ES module. ES modules and
 *    fetch() are both blocked on file:// (origin null), and this site must open
 *    by double-clicking index.html as well as from GitHub Pages.
 *  - One line per lab. The file is large, but a changed lab is a one-line diff
 *    instead of a wall of reflowed JSON.
 *  - No timestamps or other nondeterministic values, so `build --check` can
 *    compare byte-for-byte against the committed artifact.
 */

const BANNER = [
  "/*",
  " * GENERATED FILE — DO NOT EDIT.",
  " *",
  " * Source of truth: content/outline.md102.mjs, content/meta/*.mjs, content/labs/*.mjs",
  " * Regenerate with: npm run build",
  " *",
  " * Editing this file directly will be overwritten by the next build, and CI",
  " * (build --check) will fail the moment it disagrees with content/.",
  " */"
].join("\n");

function line(key, value) {
  return "M." + key + " = " + JSON.stringify(value) + ";";
}

export function emitBundle({ outline, modules, labs, personas, vms, licenses, errors, tracks, coverage }) {
  const out = [];
  out.push(BANNER);
  out.push("(function (root) {");
  out.push('  "use strict";');
  out.push("  var M = {};");
  out.push("");
  out.push("  " + line("outline", outline));
  out.push("  " + line("modules", modules));
  out.push("  " + line("personas", personas));
  out.push("  " + line("vms", vms));
  out.push("  " + line("licenses", licenses));
  out.push("  " + line("errors", errors));
  out.push("  " + line("tracks", tracks));
  out.push("  " + line("coverage", coverage));
  out.push("");
  out.push("  M.labs = [");
  labs.forEach((lab, i) => {
    out.push("    " + JSON.stringify(lab) + (i === labs.length - 1 ? "" : ","));
  });
  out.push("  ];");
  out.push("");
  out.push("  root.MD102 = M;");
  out.push('})(typeof window !== "undefined" ? window : globalThis);');
  out.push("");
  return out.join("\n");
}
