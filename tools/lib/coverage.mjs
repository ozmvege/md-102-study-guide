/**
 * Coverage computation — turns "aligned with the exam" from a claim into a number.
 *
 * A skill bullet counts as covered only when some lab claims it at depth "primary".
 * A "partial" mapping means the lab touches the topic in passing and deliberately
 * does NOT count, because otherwise coverage becomes a vanity metric.
 */

import { indexOutline } from "./schema.mjs";

export function computeCoverage(outline, labs) {
  const index = indexOutline(outline);

  /** skillId -> { primary: [labId], partial: [labId] } */
  const bySkill = new Map();
  for (const id of index.keys()) bySkill.set(id, { primary: [], partial: [] });

  for (const lab of labs) {
    for (const s of lab.skills || []) {
      const entry = bySkill.get(s.id);
      if (!entry) continue;
      entry[s.depth === "primary" ? "primary" : "partial"].push(lab.id);
    }
  }

  const groups = outline.groups.map((group) => {
    const topics = group.topics.map((topic) => {
      const skills = topic.skills.map((skill) => {
        const e = bySkill.get(skill.id);
        return {
          id: skill.id,
          text: skill.text,
          retired: !!skill.retired,
          primary: e.primary,
          partial: e.partial,
          covered: e.primary.length > 0
        };
      });
      return {
        id: topic.id,
        title: topic.title,
        skills,
        covered: skills.filter((s) => s.covered).length,
        total: skills.length
      };
    });

    const all = topics.flatMap((t) => t.skills);
    const labsInGroup = labs.filter((l) =>
      (l.skills || []).some((s) => s.depth === "primary" && s.id.startsWith(group.id + "."))
    );

    return {
      id: group.id,
      title: group.title,
      weightMin: group.weightMin,
      weightMax: group.weightMax,
      topics,
      covered: all.filter((s) => s.covered).length,
      total: all.length,
      labCount: labsInGroup.length,
      minutes: labsInGroup.reduce((a, l) => a + (l.estimatedMinutes || 0), 0)
    };
  });

  const allSkills = groups.flatMap((g) => g.topics.flatMap((t) => t.skills));
  const uncovered = allSkills.filter((s) => !s.covered && !s.retired);

  return {
    groups,
    total: allSkills.length,
    covered: allSkills.filter((s) => s.covered).length,
    uncovered,
    percent: allSkills.length ? Math.round((allSkills.filter((s) => s.covered).length / allSkills.length) * 100) : 0
  };
}

/** A short human-readable report for the terminal. */
export function formatCoverage(cov) {
  const lines = [];
  lines.push("Exam objective coverage: " + cov.covered + "/" + cov.total + " skill bullets (" + cov.percent + "%)");
  for (const g of cov.groups) {
    const bar = g.covered === g.total ? "OK  " : "GAP ";
    lines.push(
      "  " + bar + g.id + "  " + String(g.covered + "/" + g.total).padEnd(7) +
      String(g.weightMin + "-" + g.weightMax + "%").padEnd(8) +
      String(g.labCount + " labs").padEnd(9) +
      Math.round(g.minutes / 60) + "h  " + g.title
    );
  }
  if (cov.uncovered.length) {
    lines.push("");
    lines.push("Uncovered skill bullets (" + cov.uncovered.length + "):");
    for (const s of cov.uncovered) lines.push("  - " + s.id + "  " + s.text);
  }
  return lines.join("\n");
}
