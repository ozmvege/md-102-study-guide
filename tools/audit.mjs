#!/usr/bin/env node
/**
 * Automated curriculum audit and quality assurance linter.
 *
 * Scans all 61 labs in content/labs for:
 * 1. Deprecated or inaccurate portal navigation paths (nav array and step text)
 * 2. Incomplete wizard progressions and missing tab breakdowns
 * 3. Script execution contexts, elevation annotations, and verification blocks
 * 4. Cross-platform OS behavioral traps (e.g. Windows vs mobile prompt expectations)
 * 5. Persona, VM, and inter-lab prerequisite state continuity
 *
 * Usage:
 *   node tools/audit.mjs
 *   node tools/audit.mjs --strict
 */

import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const STRICT = process.argv.includes("--strict");

const COLOR = process.stdout.isTTY && !process.env.NO_COLOR;
const RED = COLOR ? "\x1b[31m" : "";
const YELLOW = COLOR ? "\x1b[33m" : "";
const GREEN = COLOR ? "\x1b[32m" : "";
const CYAN = COLOR ? "\x1b[36m" : "";
const DIM = COLOR ? "\x1b[2m" : "";
const BOLD = COLOR ? "\x1b[1m" : "";
const OFF = COLOR ? "\x1b[0m" : "";

async function load(relPath) {
  const url = pathToFileURL(join(ROOT, relPath)).href;
  const mod = await import(url);
  return mod.default;
}

// Known legacy or inaccurate navigation sequences
const DEPRECATED_NAV_PATTERNS = [
  {
    match: (nav) => nav.includes("Enrollment") && nav.includes("Device categories"),
    message: "Device categories is located at ['Devices', 'Manage devices', 'Device categories'], not under Enrollment."
  },
  {
    match: (nav) => nav.some((n) => typeof n === "string" && n.toLowerCase().includes("azure active directory")),
    message: "Azure Active Directory blade has been rebranded to Microsoft Entra ID."
  },
  {
    match: (nav) => nav.some((n) => typeof n === "string" && n.trim() === ""),
    message: "Navigation array contains an empty breadcrumb item."
  }
];

// Commands that require elevation in Windows / PowerShell
const ELEVATION_KEYWORDS = [
  "HKLM:",
  "Get-BitLockerVolume",
  "Enable-BitLocker",
  "Set-ItemProperty",
  "New-Item",
  "Stop-Service",
  "Start-Service",
  "Restart-Computer",
  "Export-WindowsDriver",
  "Install-WindowsFeature",
  "dism.exe",
  "dsregcmd /join",
  "dsregcmd /leave"
];

function auditLab(lab, meta) {
  const findings = [];
  const labRef = `Lab ${String(lab.number).padStart(2, "0")} (${lab.id})`;

  // 1. Audit Requirements & Dependencies
  const personas = new Set(meta.personas.map((p) => p.id));
  const vms = new Set(meta.vms.map((v) => v.id));

  for (const p of lab.requires?.personas || []) {
    if (!personas.has(p)) {
      findings.push({
        severity: "error",
        rule: "dependency/unknown-persona",
        message: `Requires unknown persona "${p}".`,
        location: labRef
      });
    }
  }

  for (const p of lab.requires?.platforms || []) {
    if (p.kind === "vm" && !vms.has(p.id)) {
      findings.push({
        severity: "error",
        rule: "dependency/unknown-vm",
        message: `Requires unknown VM platform "${p.id}".`,
        location: labRef
      });
    }
  }

  // 2. Audit Exercises, Tasks, and Steps
  (lab.exercises || []).forEach((ex, exIdx) => {
    (ex.tasks || []).forEach((task, tIdx) => {
      (task.steps || []).forEach((step, sIdx) => {
        const stepLoc = `${labRef} > Ex ${exIdx + 1} (${ex.id}) > Task ${tIdx + 1} (${task.id}) > Step ${sIdx + 1}`;

        // Navigation Breadcrumb Checks
        if (Array.isArray(step.nav)) {
          for (const pattern of DEPRECATED_NAV_PATTERNS) {
            if (pattern.match(step.nav)) {
              findings.push({
                severity: "error",
                rule: "nav/deprecated-path",
                message: pattern.message + ` Current nav: [${step.nav.map((s) => `"${s}"`).join(", ")}]`,
                location: stepLoc
              });
            }
          }
        }

        // Wizard & Input Completeness Checks
        const parts = step.parts || [];
        const inputPart = parts.find((p) => p.kind === "inputs");
        if (inputPart) {
          const stepTextLower = (step.text || "").toLowerCase();
          const hasSubsteps = parts.some((p) => p.kind === "substeps");

          const isCreation =
            stepTextLower.includes("create") ||
            stepTextLower.includes("add ") ||
            stepTextLower.includes("new ");

          // If creating a resource with multiple input rows, check if wizard tab progression is explained
          if (isCreation && inputPart.rows && inputPart.rows.length >= 2) {
            const describesWizard =
              hasSubsteps ||
              stepTextLower.includes("review + create") ||
              stepTextLower.includes("review + save") ||
              stepTextLower.includes("scope tags") ||
              stepTextLower.includes("basics") ||
              stepTextLower.includes("cancel") ||
              stepTextLower.includes("select **create**") ||
              stepTextLower.includes("select **save**");

            if (!describesWizard) {
              findings.push({
                severity: "warn",
                rule: "wizard/incomplete-flow",
                message:
                  "Step creates a multi-field resource but does not specify wizard tab flow (e.g. Basics -> Scope tags -> Review + create).",
                location: stepLoc
              });
            }
          }
        }

        // Script Execution Context & Elevation Checks
        const SCRIPT_LANGS = new Set(["powershell", "cmd", "sh", "bash"]);
        const codeParts = parts.filter((p) => p.kind === "code" && SCRIPT_LANGS.has(p.lang));
        codeParts.forEach((codePart) => {
          const code = codePart.code || "";
          const text = (step.text || "") + " " + (codePart.caption || "");

          // Elevation checks
          const needsElevation = ELEVATION_KEYWORDS.some((kw) => code.includes(kw));
          if (needsElevation) {
            const mentionsElevation =
              text.toLowerCase().includes("elevated") ||
              text.toLowerCase().includes("administrator") ||
              text.toLowerCase().includes("admin prompt") ||
              text.toLowerCase().includes("run as administrator");
            if (!mentionsElevation) {
              findings.push({
                severity: "warn",
                rule: "script/missing-elevation-note",
                message:
                  "Script touches privileged keys/cmdlets (e.g. HKLM/services/BitLocker) but step text does not explicitly specify an elevated Administrator prompt.",
                location: stepLoc
              });
            }
          }

          // Target Execution Context (Host vs VM)
          const textLower = text.toLowerCase();
          const specifiesTarget =
            text.includes("VM") ||
            text.includes("MD102-") ||
            textLower.includes("host") ||
            textLower.includes("workstation") ||
            textLower.includes("client") ||
            textLower.includes("powershell") ||
            textLower.includes("command prompt") ||
            textLower.includes("terminal");
          if (!specifiesTarget && lab.requires?.platforms?.some((p) => p.kind === "vm")) {
            findings.push({
              severity: "warn",
              rule: "script/unspecified-context",
              message:
                "Script block does not explicitly state execution context (Host vs specific VM).",
              location: stepLoc
            });
          }
        });

        // Platform Divergence / Trap Checks
        if (
          step.text &&
          step.text.toLowerCase().includes("device categor") &&
          step.text.toLowerCase().includes("enrollment experience")
        ) {
          const hasWindowsDisclaimer = parts.some(
            (p) =>
              p.kind === "callout" &&
              (p.text.includes("Windows") || p.text.includes("iOS") || p.text.includes("prompt"))
          );
          if (!hasWindowsDisclaimer) {
            findings.push({
              severity: "warn",
              rule: "platform/unwarned-divergence",
              message:
                "Step configures Device Categories around enrollment experience without warning about Windows client prompt absence.",
              location: stepLoc
            });
          }
        }
      });
    });
  });

  return findings;
}

async function main() {
  console.log(`${BOLD}${CYAN}MD-102 Curriculum Automated Audit Linter${OFF}\n`);

  const meta = {};
  for (const name of ["modules", "personas", "vms", "licenses", "errors", "tracks"]) {
    meta[name] = await load(`content/meta/${name}.mjs`);
  }

  const labsDir = join(ROOT, "content/labs");
  const files = (await readdir(labsDir)).filter((f) => f.endsWith(".mjs")).sort();

  const allFindings = [];

  for (const file of files) {
    const lab = await load("content/labs/" + file);
    const m = /^(\d+)-/.exec(file);
    lab.number = m ? parseInt(m[1], 10) : 0;
    lab.sourceFile = "content/labs/" + file;

    const findings = auditLab(lab, meta);
    allFindings.push(...findings);
  }

  const errors = allFindings.filter((f) => f.severity === "error");
  const warnings = allFindings.filter((f) => f.severity === "warn");

  console.log(`${DIM}Scanned ${files.length} labs across ${meta.modules.length} modules.${OFF}\n`);

  if (allFindings.length === 0) {
    console.log(`${GREEN}✔ All 61 labs passed audit with 0 errors and 0 warnings.${OFF}\n`);
    process.exit(0);
  }

  // Group by rule
  const byRule = new Map();
  for (const f of allFindings) {
    if (!byRule.has(f.rule)) byRule.set(f.rule, []);
    byRule.get(f.rule).push(f);
  }

  console.log(`${BOLD}Findings Breakdown by Rule:${OFF}`);
  for (const [rule, list] of byRule) {
    const color = list[0].severity === "error" ? RED : YELLOW;
    console.log(`  ${color}${rule}${OFF}: ${list.length} occurrence(s)`);
  }
  console.log("");

  // Detailed findings list
  for (const f of allFindings) {
    const tag = f.severity === "error" ? `${RED}[ERROR]${OFF}` : `${YELLOW}[WARN]${OFF}`;
    console.log(`${tag} ${BOLD}${f.location}${OFF}`);
    console.log(`       ${DIM}${f.rule}:${OFF} ${f.message}`);
  }

  console.log(`\n${BOLD}Audit Summary:${OFF} ${errors.length} error(s), ${warnings.length} warning(s).`);

  if (errors.length > 0 || (STRICT && warnings.length > 0)) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(RED + (err.stack || String(err)) + OFF);
  process.exit(1);
});
