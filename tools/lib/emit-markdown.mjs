/**
 * Emit LAB_GUIDE.md — the offline/print/Ctrl-F mirror of the whole curriculum.
 *
 * This walks exactly the same tree the browser renderer walks, which is the only
 * reason the two can never disagree. Callout variants map onto GitHub alert
 * syntax, which is why the schema allows precisely note/important/tip/warning/caution.
 */

import { toMarkdown } from "./inline.mjs";

const ALERT = {
  note: "NOTE",
  important: "IMPORTANT",
  tip: "TIP",
  warning: "WARNING",
  caution: "CAUTION"
};

const ACCESS_LABEL = {
  "hands-on": "Hands-on",
  "walkthrough-license": "Walkthrough — licence not included in Microsoft 365 E5",
  "walkthrough-device": "Walkthrough — required device not available in this lab"
};

function md(s) {
  return toMarkdown(s);
}

function indent(text, pad) {
  return text
    .split("\n")
    .map((l) => (l.trim() ? pad + l : l))
    .join("\n");
}

function renderPart(part, pad) {
  const out = [];
  switch (part.kind) {
    case "substeps":
      part.items.forEach((it, i) => {
        out.push(pad + String.fromCharCode(97 + i) + ". " + md(it.text));
      });
      break;

    case "callout":
      out.push(pad + "> [!" + ALERT[part.variant] + "]");
      out.push(pad + "> " + md(part.text).replace(/\n/g, "\n" + pad + "> "));
      break;

    case "code":
      if (part.caption) out.push(pad + "*" + md(part.caption) + "*");
      out.push(pad + "```" + (part.lang || ""));
      out.push(indent(part.code, pad));
      out.push(pad + "```");
      break;

    case "inputs":
      out.push(pad + "| Setting | Value |");
      out.push(pad + "| --- | --- |");
      for (const r of part.rows) {
        const note = r.note ? " <br> " + md(r.note) : "";
        out.push(pad + "| " + md(r.label) + " | **" + md(String(r.value)) + "**" + note + " |");
      }
      break;

    case "table":
      out.push(pad + "| " + part.headers.map(md).join(" | ") + " |");
      out.push(pad + "| " + part.headers.map(() => "---").join(" | ") + " |");
      for (const r of part.rows) out.push(pad + "| " + r.map((c) => md(String(c))).join(" | ") + " |");
      break;

    case "verify":
      out.push(pad + "**Verify:** " + md(part.text));
      if (part.expected) {
        out.push(pad + "```");
        out.push(indent(part.expected, pad));
        out.push(pad + "```");
      }
      break;

    case "figure":
      out.push(pad + "*" + md(part.text) + "*");
      break;
  }
  return out;
}

function renderTask(task, taskNumber) {
  const out = [];
  out.push("#### Task " + taskNumber + ": " + md(task.title));
  out.push("");
  task.steps.forEach((step, i) => {
    const n = i + 1;
    const pad = " ".repeat(String(n).length + 2);
    out.push(n + ". " + md(step.text));
    if (step.nav && step.nav.length) {
      out.push(pad + "*Path:* " + step.nav.map((x) => "**" + md(x) + "**").join(" > "));
    }
    for (const part of step.parts || []) {
      out.push("");
      out.push(...renderPart(part, pad));
    }
    out.push("");
  });

  if (task.result) {
    out.push("**Results:** " + md(task.result.text));
    if ((task.result.verify || []).length) {
      out.push("");
      for (const v of task.result.verify) out.push("- [ ] " + md(v.text));
    }
    out.push("");
  }
  return out;
}

function renderLab(lab, number, outlineIndex) {
  const out = [];
  out.push("## Lab " + number + ": " + md(lab.title));
  out.push("");

  const facts = [
    "**Access:** " + ACCESS_LABEL[lab.access],
    "**Estimated time:** " + lab.estimatedMinutes + " minutes",
    "**Difficulty:** " + lab.difficulty
  ];
  out.push(facts.join(" · "));
  out.push("");

  if (lab.access !== "hands-on") {
    out.push("> [!IMPORTANT]");
    out.push("> " + md(lab.accessReason));
    out.push("");
  }

  out.push("### Lab scenario");
  out.push("");
  out.push(md(lab.scenario));
  out.push("");

  out.push("### Objectives");
  out.push("");
  out.push("After completing this lab, you will be able to:");
  out.push("");
  for (const o of lab.objectives) out.push("- " + md(o));
  out.push("");

  const primary = (lab.skills || []).filter((s) => s.depth === "primary");
  if (primary.length) {
    out.push("### Exam objectives covered");
    out.push("");
    for (const s of primary) {
      const hit = outlineIndex.get(s.id);
      out.push("- `" + s.id + "` — " + (hit ? hit.skill.text : "(unknown)"));
    }
    out.push("");
  }

  const rq = lab.requires || {};
  const prereqLines = [];
  if ((rq.labs || []).length) prereqLines.push("- Completed labs: " + rq.labs.map((l) => "`" + l + "`").join(", "));
  if ((rq.licenses || []).length) prereqLines.push("- Licences: " + rq.licenses.join(", "));
  if ((rq.roles || []).length) prereqLines.push("- Roles: " + rq.roles.join(", "));
  if ((rq.platforms || []).length) prereqLines.push("- Devices and portals: " + rq.platforms.map((p) => p.id + (p.os ? " (" + p.os + ")" : "")).join(", "));
  if ((rq.personas || []).length) prereqLines.push("- Personas: " + rq.personas.join(", "));
  if (prereqLines.length) {
    out.push("### Prerequisites");
    out.push("");
    out.push(...prereqLines);
    out.push("");
  }

  lab.exercises.forEach((ex, i) => {
    out.push("### Exercise " + (i + 1) + ": " + md(ex.title));
    out.push("");
    if (ex.intro) {
      out.push(md(ex.intro));
      out.push("");
    }
    ex.tasks.forEach((t, j) => out.push(...renderTask(t, j + 1)));
  });

  if ((lab.scripts || []).length) {
    out.push("### Scripts");
    out.push("");
    for (const s of lab.scripts) {
      out.push("#### " + md(s.title));
      out.push("");
      if (s.note) {
        out.push("> [!NOTE]");
        out.push("> " + md(s.note));
        out.push("");
      }
      out.push("```" + s.lang);
      out.push(s.code);
      out.push("```");
      out.push("");
    }
  }

  if ((lab.troubleshooting || []).length) {
    out.push("### Troubleshooting");
    out.push("");
    for (const t of lab.troubleshooting) {
      out.push("**Symptom:** " + md(t.symptom));
      out.push("");
      out.push("- **Root cause:** " + md(t.rootCause));
      if (t.diagnostic) {
        out.push("- **Diagnostic:**");
        out.push("");
        out.push("  ```" + (t.diagnostic.lang || ""));
        out.push(indent(t.diagnostic.code, "  "));
        out.push("  ```");
        out.push("");
      }
      out.push("- **Resolution:** " + md(t.resolution));
      if ((t.errorCodes || []).length) out.push("- **Error codes:** " + t.errorCodes.map((c) => "`" + c + "`").join(", "));
      out.push("");
    }
  }

  if ((lab.quiz || []).length) {
    out.push("### Knowledge check");
    out.push("");
    lab.quiz.forEach((q, i) => {
      out.push("**Q" + (i + 1) + ".** " + md(q.question));
      out.push("");
      q.options.forEach((o, j) => out.push(String.fromCharCode(65 + j) + ". " + md(o)));
      out.push("");
      out.push("<details><summary>Answer</summary>");
      out.push("");
      out.push("**" + String.fromCharCode(65 + q.correctIndex) + "** — " + md(q.rationale));
      if (q.examTip) {
        out.push("");
        out.push("*Exam tip:* " + md(q.examTip));
      }
      out.push("");
      out.push("</details>");
      out.push("");
    });
  }

  out.push("---");
  out.push("");
  return out;
}

export function emitMarkdown({ outline, modules, labs, coverage, outlineIndex }) {
  const out = [];
  out.push("<!-- GENERATED FILE — edit content/labs/*.mjs and run: npm run build -->");
  out.push("");
  out.push("# " + outline.examCode + " — " + outline.examTitle);
  out.push("");
  out.push("Hands-on lab curriculum for the " + outline.certification + " certification.");
  out.push("");
  out.push(
    "Aligned to the skills measured outline of **" +
      outline.version +
      "** ([source](" +
      outline.sourceUrl +
      ")). " +
      labs.length +
      " labs across " +
      modules.length +
      " modules covering " +
      coverage.covered +
      " of " +
      coverage.total +
      " skill bullets."
  );
  out.push("");

  out.push("## Exam objective coverage");
  out.push("");
  out.push("| Group | Weight | Skill bullets covered | Labs | Lab time |");
  out.push("| --- | --- | --- | --- | --- |");
  for (const g of coverage.groups) {
    out.push(
      "| " + g.title + " | " + g.weightMin + "–" + g.weightMax + "% | " +
      g.covered + "/" + g.total + " | " + g.labCount + " | " + Math.round(g.minutes / 60) + " h |"
    );
  }
  out.push("");

  if (coverage.uncovered.length) {
    out.push("> [!WARNING]");
    out.push("> " + coverage.uncovered.length + " skill bullets are not yet covered by any lab.");
    out.push("");
  }

  out.push("## Curriculum");
  out.push("");
  let n = 0;
  for (const mod of modules) {
    const inMod = labs.filter((l) => l.moduleId === mod.id);
    if (!inMod.length) continue;
    out.push("**" + mod.title + "** — " + mod.description);
    out.push("");
    for (const lab of inMod) {
      n++;
      const badge = lab.access === "hands-on" ? "" : " *(walkthrough)*";
      // Numbering comes from lab.number (the filename prefix), never from the
      // position in this loop: authored text cross-references labs by that number,
      // and a lab 0 would otherwise shift every label by one.
      out.push(n + ". [Lab " + lab.number + " — " + md(lab.title) + "](#lab-" + lab.number + "-" + slug(lab.title) + ")" + badge);
    }
    out.push("");
  }

  for (const mod of modules) {
    const inMod = labs.filter((l) => l.moduleId === mod.id);
    if (!inMod.length) continue;
    out.push("# " + mod.title);
    out.push("");
    out.push(md(mod.description));
    out.push("");
    for (const lab of inMod) {
      out.push(...renderLab(lab, lab.number, outlineIndex));
    }
  }

  return out.join("\n");
}

function slug(title) {
  return String(title)
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
