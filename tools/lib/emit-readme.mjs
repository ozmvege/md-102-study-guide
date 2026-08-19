/**
 * Emit the generated regions of README.md.
 *
 * Only the marked regions are rewritten; the surrounding prose is hand-written.
 * Markers must exist in the file or the build fails loudly rather than silently
 * leaving stale counts behind — stale counts are exactly how this repo ended up
 * claiming 22, 29 and 30 labs on the same screen.
 */

const REGIONS = ["SUMMARY", "COVERAGE", "CURRICULUM"];

function region(name, body) {
  return "<!-- BEGIN:" + name + " -->\n" + body + "\n<!-- END:" + name + " -->";
}

function replaceRegion(source, name, body) {
  const re = new RegExp(
    "<!-- BEGIN:" + name + " -->[\\s\\S]*?<!-- END:" + name + " -->",
    "m"
  );
  if (!re.test(source)) {
    throw new Error(
      "README.md is missing the <!-- BEGIN:" + name + " --> / <!-- END:" + name + " --> markers"
    );
  }
  return source.replace(re, region(name, body));
}

export function emitReadme(existing, { outline, modules, labs, coverage }) {
  const handsOn = labs.filter((l) => l.access === "hands-on").length;
  const minutes = labs.reduce((a, l) => a + (l.estimatedMinutes || 0), 0);

  const summary = [
    "| | |",
    "| --- | --- |",
    "| Exam | **" + outline.examCode + "** — " + outline.examTitle + " |",
    "| Skills outline | " + outline.version + " ([source](" + outline.sourceUrl + ")) |",
    "| Labs | " + labs.length + " across " + modules.length + " modules (" + handsOn + " hands-on, " + (labs.length - handsOn) + " walkthrough) |",
    "| Lab time | ~" + Math.round(minutes / 60) + " hours |",
    "| Objective coverage | " + coverage.covered + " of " + coverage.total + " skill bullets (" + coverage.percent + "%) |"
  ].join("\n");

  const cov = [
    "| Exam group | Weight | Skill bullets | Labs | Lab time |",
    "| --- | --- | --- | --- | --- |",
    ...coverage.groups.map(
      (g) =>
        "| " + g.title + " | " + g.weightMin + "–" + g.weightMax + "% | " +
        g.covered + "/" + g.total + " | " + g.labCount + " | " + Math.round(g.minutes / 60) + " h |"
    )
  ].join("\n");

  const rows = ["| # | Lab | Module | Access | Time |", "| --- | --- | --- | --- | --- |"];
  let n = 0;
  for (const mod of modules) {
    for (const lab of labs.filter((l) => l.moduleId === mod.id)) {
      n++;
      const access =
        lab.access === "hands-on"
          ? "Hands-on"
          : lab.access === "walkthrough-license"
          ? "Walkthrough (licence)"
          : "Walkthrough (device)";
      rows.push(
        "| " + n + " | " + lab.title.replace(/\|/g, "\\|") + " | " + mod.shortTitle + " | " + access + " | " + lab.estimatedMinutes + " min |"
      );
    }
  }

  let out = existing;
  out = replaceRegion(out, "SUMMARY", summary);
  out = replaceRegion(out, "COVERAGE", cov);
  out = replaceRegion(out, "CURRICULUM", rows.join("\n"));
  return out;
}

export { REGIONS };
