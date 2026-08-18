/**
 * Lab schema validation.
 *
 * This is the mechanism that stops the repository drifting the way it did before:
 * a lab that claims an exam objective which does not exist, a checkpoint with no
 * way to verify it, or a step containing raw HTML is a build failure, not a thing
 * someone notices six months later.
 */

import { validateInline } from "./inline.mjs";

const ACCESS = new Set(["hands-on", "walkthrough-license", "walkthrough-device"]);
const DIFFICULTY = new Set(["foundational", "intermediate", "advanced"]);
const DEPTH = new Set(["primary", "partial"]);
const CALLOUT = new Set(["note", "important", "tip", "warning", "caution"]);
const PART_KINDS = new Set(["substeps", "callout", "code", "inputs", "verify", "table", "figure"]);

const ID_RE = /^[a-z0-9][a-z0-9-]*$/;

/** Flatten the outline into a Map of skillId -> {skill, topic, group}. */
export function indexOutline(outline) {
  const map = new Map();
  for (const group of outline.groups) {
    for (const topic of group.topics) {
      for (const skill of topic.skills) {
        map.set(skill.id, { skill, topic, group });
      }
    }
  }
  return map;
}

function req(errors, cond, msg) {
  if (!cond) errors.push(msg);
}

function checkText(errors, value, where) {
  for (const e of validateInline(value, where)) errors.push(e);
}

function checkPart(errors, part, where) {
  if (!part || typeof part !== "object") {
    errors.push(where + ": part must be an object");
    return;
  }
  req(errors, PART_KINDS.has(part.kind), where + ': unknown part kind "' + part.kind + '"');

  switch (part.kind) {
    case "substeps":
      req(errors, Array.isArray(part.items) && part.items.length > 0, where + ": substeps needs items");
      (part.items || []).forEach((it, i) => {
        req(errors, typeof it.text === "string" && it.text.trim(), where + ".items[" + i + "]: missing text");
        checkText(errors, it.text, where + ".items[" + i + "]");
      });
      break;

    case "callout":
      req(errors, CALLOUT.has(part.variant), where + ': callout variant must be one of note|important|tip|warning|caution, got "' + part.variant + '"');
      req(errors, typeof part.text === "string" && part.text.trim(), where + ": callout needs text");
      checkText(errors, part.text, where);
      break;

    case "code":
      req(errors, typeof part.lang === "string" && part.lang, where + ": code needs a lang");
      req(errors, typeof part.code === "string" && part.code.trim(), where + ": code needs code");
      if (part.caption) checkText(errors, part.caption, where + ".caption");
      break;

    case "inputs":
      req(errors, Array.isArray(part.rows) && part.rows.length > 0, where + ": inputs needs rows");
      (part.rows || []).forEach((r, i) => {
        req(errors, typeof r.label === "string" && r.label.trim(), where + ".rows[" + i + "]: missing label");
        req(errors, r.value !== undefined && r.value !== null && String(r.value).trim(), where + ".rows[" + i + "]: missing value");
        checkText(errors, r.label, where + ".rows[" + i + "].label");
        checkText(errors, String(r.value), where + ".rows[" + i + "].value");
        if (r.note) checkText(errors, r.note, where + ".rows[" + i + "].note");
      });
      break;

    case "table":
      req(errors, Array.isArray(part.headers) && part.headers.length > 0, where + ": table needs headers");
      req(errors, Array.isArray(part.rows) && part.rows.length > 0, where + ": table needs rows");
      (part.rows || []).forEach((r, i) => {
        req(errors, Array.isArray(r) && r.length === (part.headers || []).length,
          where + ".rows[" + i + "]: expected " + (part.headers || []).length + " cells, got " + (Array.isArray(r) ? r.length : "not an array"));
        (Array.isArray(r) ? r : []).forEach((c, j) => checkText(errors, String(c), where + ".rows[" + i + "][" + j + "]"));
      });
      (part.headers || []).forEach((h, i) => checkText(errors, String(h), where + ".headers[" + i + "]"));
      break;

    case "verify":
      req(errors, typeof part.text === "string" && part.text.trim(), where + ": verify needs text");
      checkText(errors, part.text, where);
      break;

    case "figure":
      req(errors, typeof part.text === "string" && part.text.trim(), where + ": figure needs descriptive text");
      checkText(errors, part.text, where);
      break;
  }
}

function checkStep(errors, step, where) {
  req(errors, typeof step.text === "string" && step.text.trim(), where + ": step needs text");
  checkText(errors, step.text, where);
  if (step.nav !== undefined) {
    req(errors, Array.isArray(step.nav) && step.nav.length > 0, where + ": nav must be a non-empty array");
    (step.nav || []).forEach((n, i) => checkText(errors, String(n), where + ".nav[" + i + "]"));
  }
  (step.parts || []).forEach((p, i) => checkPart(errors, p, where + ".parts[" + i + "]"));
}

function checkTask(errors, task, where) {
  req(errors, ID_RE.test(task.id || ""), where + ': task id must be kebab-case, got "' + task.id + '"');
  req(errors, typeof task.title === "string" && task.title.trim(), where + ": task needs a title");
  checkText(errors, task.title, where + ".title");
  req(errors, Array.isArray(task.steps) && task.steps.length > 0, where + ": task needs at least one step");
  (task.steps || []).forEach((s, i) => checkStep(errors, s, where + ".steps[" + i + "]"));

  // A checkpoint the learner can tick must state how to know it worked. Without
  // this rule, checklists drift away from the procedure they claim to verify.
  if (task.checkpoint) {
    req(errors, task.result && typeof task.result.text === "string" && task.result.text.trim(),
      where + ": checkpoint task must have a result block saying what was accomplished");
  }
  if (task.result) {
    checkText(errors, task.result.text, where + ".result.text");
    (task.result.verify || []).forEach((v, i) => {
      req(errors, typeof v.text === "string" && v.text.trim(), where + ".result.verify[" + i + "]: missing text");
      checkText(errors, v.text, where + ".result.verify[" + i + "]");
    });
  }
}

function checkExercise(errors, ex, where) {
  req(errors, ID_RE.test(ex.id || ""), where + ': exercise id must be kebab-case, got "' + ex.id + '"');
  req(errors, typeof ex.title === "string" && ex.title.trim(), where + ": exercise needs a title");
  checkText(errors, ex.title, where + ".title");
  if (ex.intro) checkText(errors, ex.intro, where + ".intro");
  req(errors, Array.isArray(ex.tasks) && ex.tasks.length > 0, where + ": exercise needs at least one task");

  const ids = new Set();
  (ex.tasks || []).forEach((t, i) => {
    if (ids.has(t.id)) errors.push(where + ": duplicate task id " + t.id);
    ids.add(t.id);
    checkTask(errors, t, where + ".tasks[" + i + "]");
  });
}

/**
 * Validate one lab against the outline and the set of known lab ids.
 * Returns { errors, warnings }.
 */
export function validateLab(lab, ctx) {
  const errors = [];
  const warnings = [];
  const where = lab && lab.id ? "labs/" + lab.id : "labs/<unknown>";

  if (!lab || typeof lab !== "object") {
    return { errors: [where + ": lab module has no default export object"], warnings };
  }

  req(errors, ID_RE.test(lab.id || ""), where + ': lab id must be kebab-case, got "' + lab.id + '"');
  req(errors, typeof lab.title === "string" && lab.title.trim(), where + ": missing title");
  req(errors, typeof lab.scenario === "string" && lab.scenario.trim(), where + ": missing lab scenario");
  req(errors, Array.isArray(lab.objectives) && lab.objectives.length > 0, where + ": missing objectives");
  req(errors, Number.isFinite(lab.estimatedMinutes) && lab.estimatedMinutes > 0, where + ": estimatedMinutes must be a positive number");
  req(errors, ACCESS.has(lab.access), where + ': access must be hands-on|walkthrough-license|walkthrough-device, got "' + lab.access + '"');
  req(errors, DIFFICULTY.has(lab.difficulty), where + ': difficulty must be foundational|intermediate|advanced, got "' + lab.difficulty + '"');
  req(errors, typeof lab.moduleId === "string" && lab.moduleId, where + ": missing moduleId");
  if (ctx.modules && lab.moduleId && !ctx.modules.has(lab.moduleId)) {
    errors.push(where + ': unknown moduleId "' + lab.moduleId + '"');
  }

  checkText(errors, lab.title, where + ".title");
  checkText(errors, lab.scenario, where + ".scenario");
  (lab.objectives || []).forEach((o, i) => checkText(errors, o, where + ".objectives[" + i + "]"));
  (lab.keyConcepts || []).forEach((c, i) => checkText(errors, c, where + ".keyConcepts[" + i + "]"));

  // --- Exam objective mapping ------------------------------------------------
  req(errors, Array.isArray(lab.skills), where + ": skills must be an array");
  let primaries = 0;
  (lab.skills || []).forEach((s, i) => {
    const at = where + ".skills[" + i + "]";
    req(errors, DEPTH.has(s.depth), at + ': depth must be primary|partial, got "' + s.depth + '"');
    if (!ctx.outlineIndex.has(s.id)) {
      errors.push(at + ': skill id "' + s.id + '" does not exist in the ' + ctx.outline.version + " outline");
    } else if (ctx.outlineIndex.get(s.id).skill.retired) {
      warnings.push(at + ': skill "' + s.id + '" is retired in the current outline');
    }
    if (s.depth === "primary") primaries++;
  });
  // Environment-setup labs are prerequisites, not exam content, and say so.
  if (!lab.nonExam) {
    req(errors, primaries > 0, where + ": needs at least one primary skill mapping (or nonExam: true)");
  }

  // --- Requirements ----------------------------------------------------------
  const rq = lab.requires || {};
  (rq.licenses || []).forEach((l) => {
    if (ctx.licenses && !ctx.licenses.has(l)) errors.push(where + ': unknown license id "' + l + '"');
  });
  (rq.personas || []).forEach((p) => {
    if (ctx.personas && !ctx.personas.has(p)) errors.push(where + ': unknown persona id "' + p + '"');
  });
  (rq.labs || []).forEach((dep) => {
    if (!ctx.labIds.has(dep)) {
      errors.push(where + ': prerequisite lab "' + dep + '" does not exist');
    } else if (ctx.order.get(dep) >= ctx.order.get(lab.id)) {
      errors.push(where + ': prerequisite "' + dep + '" comes later in the curriculum (lab ' + ctx.order.get(dep) + " vs " + ctx.order.get(lab.id) + ")");
    }
  });

  // A lab you cannot run must say why, so the badge is never a guess.
  if (lab.access !== "hands-on") {
    req(errors, typeof lab.accessReason === "string" && lab.accessReason.trim(),
      where + ": walkthrough labs must set accessReason explaining what is missing");
    if (lab.accessReason) checkText(errors, lab.accessReason, where + ".accessReason");
  }

  // --- Body ------------------------------------------------------------------
  req(errors, Array.isArray(lab.exercises) && lab.exercises.length > 0, where + ": lab needs at least one exercise");
  const exIds = new Set();
  (lab.exercises || []).forEach((ex, i) => {
    if (exIds.has(ex.id)) errors.push(where + ": duplicate exercise id " + ex.id);
    exIds.add(ex.id);
    checkExercise(errors, ex, where + ".exercises[" + i + "]");
    (ex.skills || []).forEach((sid) => {
      if (!ctx.outlineIndex.has(sid)) errors.push(where + ".exercises[" + i + '].skills: unknown skill "' + sid + '"');
      if (!(lab.skills || []).some((s) => s.id === sid)) {
        errors.push(where + ".exercises[" + i + '].skills: "' + sid + '" is not declared at lab level');
      }
    });
  });

  // --- Supporting material ---------------------------------------------------
  (lab.scripts || []).forEach((s, i) => {
    const at = where + ".scripts[" + i + "]";
    req(errors, typeof s.title === "string" && s.title.trim(), at + ": missing title");
    req(errors, typeof s.lang === "string" && s.lang, at + ": missing lang");
    req(errors, typeof s.code === "string" && s.code.trim(), at + ": missing code");
    checkText(errors, s.title, at + ".title");
    if (s.note) checkText(errors, s.note, at + ".note");
  });

  (lab.troubleshooting || []).forEach((t, i) => {
    const at = where + ".troubleshooting[" + i + "]";
    req(errors, typeof t.symptom === "string" && t.symptom.trim(), at + ": missing symptom");
    req(errors, typeof t.rootCause === "string" && t.rootCause.trim(), at + ": missing rootCause");
    req(errors, typeof t.resolution === "string" && t.resolution.trim(), at + ": missing resolution");
    checkText(errors, t.symptom, at + ".symptom");
    checkText(errors, t.rootCause, at + ".rootCause");
    checkText(errors, t.resolution, at + ".resolution");
    (t.errorCodes || []).forEach((code) => {
      if (ctx.errors && !ctx.errors.has(code)) errors.push(at + ': unknown error code "' + code + '"');
    });
  });

  (lab.quiz || []).forEach((q, i) => {
    const at = where + ".quiz[" + i + "]";
    req(errors, typeof q.question === "string" && q.question.trim(), at + ": missing question");
    req(errors, Array.isArray(q.options) && q.options.length >= 3, at + ": needs at least 3 options");
    req(errors, Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < (q.options || []).length,
      at + ": correctIndex out of range");
    req(errors, typeof q.rationale === "string" && q.rationale.trim(), at + ": missing rationale");
    checkText(errors, q.question, at + ".question");
    checkText(errors, q.rationale, at + ".rationale");
    if (q.examTip) checkText(errors, q.examTip, at + ".examTip");
    (q.options || []).forEach((o, j) => checkText(errors, o, at + ".options[" + j + "]"));
    (q.skills || []).forEach((sid) => {
      if (!ctx.outlineIndex.has(sid)) errors.push(at + '.skills: unknown skill "' + sid + '"');
    });
  });

  // --- Migration debt --------------------------------------------------------
  const raw = JSON.stringify(lab);
  if (raw.includes('"todo"')) {
    errors.push(where + ": contains an unresolved migration todo marker");
  }

  return { errors, warnings };
}

/** Validate the whole corpus. Returns { errors, warnings }. */
export function validateAll(outline, labs, meta) {
  const errors = [];
  const warnings = [];

  const outlineIndex = indexOutline(outline);
  const labIds = new Set(labs.map((l) => l.id));
  const order = new Map(labs.map((l, i) => [l.id, i + 1]));

  const ctx = {
    outline,
    outlineIndex,
    labIds,
    order,
    modules: new Set((meta.modules || []).map((m) => m.id)),
    licenses: new Set((meta.licenses || []).map((l) => l.id)),
    personas: new Set((meta.personas || []).map((p) => p.id)),
    errors: new Set((meta.errors || []).map((e) => e.code))
  };

  const seen = new Set();
  for (const lab of labs) {
    if (seen.has(lab.id)) errors.push("duplicate lab id: " + lab.id);
    seen.add(lab.id);
    const r = validateLab(lab, ctx);
    errors.push(...r.errors);
    warnings.push(...r.warnings);
  }

  errors.push(...validateSeatBudget(meta.personas || []));

  return { errors, warnings };
}

/**
 * The 25-seat trial budget is a hard constraint of this lab, not a guideline.
 * Exceeding it means group-based licensing silently fails to assign a seat and
 * the learner hits enrollment error 0x80180018 with no obvious cause — so it is
 * enforced here rather than left as a comment someone can drift past.
 */
export const SEAT_POOL = 25;
export const SEAT_RESERVE = 5;

export function validateSeatBudget(personas) {
  const errors = [];
  const licensed = personas.filter((p) => p.licensed);
  const budget = SEAT_POOL - SEAT_RESERVE;

  if (licensed.length > budget) {
    errors.push(
      "meta/personas: " + licensed.length + " personas are licensed but the budget is " +
      budget + " (" + SEAT_POOL + "-seat pool minus a " + SEAT_RESERVE + "-seat reserve). Remove " +
      (licensed.length - budget) + " or mark them licensed: false."
    );
  }

  const ids = new Set();
  for (const p of personas) {
    if (ids.has(p.id)) errors.push("meta/personas: duplicate persona id " + p.id);
    ids.add(p.id);
    if (!p.upn || !p.upn.includes("@")) errors.push("meta/personas: " + p.id + " has no valid upn");
    if (p.licensed && !(p.groups || []).includes("GRP-LIC-M365-E5")) {
      errors.push(
        "meta/personas: " + p.id + " is licensed but is not a member of GRP-LIC-M365-E5, " +
        "so group-based licensing would never assign it a seat"
      );
    }
    if (!p.licensed && (p.groups || []).includes("GRP-LIC-M365-E5")) {
      errors.push("meta/personas: " + p.id + " is unlicensed but is in GRP-LIC-M365-E5, which would consume a seat");
    }
  }

  return errors;
}
