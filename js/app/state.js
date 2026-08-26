/*
 * Application state and persistence.
 *
 * Classic script, no modules: ES modules are blocked on file:// (origin null) and
 * this site must open by double-clicking index.html as well as from Pages.
 */
(function (root) {
  "use strict";

  var KEY = "md102_state_v2";
  var LEGACY_KEY = "md102_portal_state_v1";

  var state = {
    tenant: "contoso",
    theme: null, // null = follow the operating system
    done: {}, // "labId/exId/taskId" -> true
    quiz: {}, // "labId/quizId" -> chosen option index
    search: "",
    legacyFound: false
  };

  /**
   * Drop quiz answers with an empty question id.
   *
   * Before questions carried ids, every answer in a lab was written to the single
   * key "<labId>/". No question can ever match one again, so they are the wreckage
   * of that bug rather than progress worth carrying forward.
   */
  function pruneQuiz(saved) {
    var out = {};
    Object.keys(saved).forEach(function (k) {
      if (k.slice(k.lastIndexOf("/") + 1)) out[k] = saved[k];
    });
    return out;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (saved.tenant) state.tenant = saved.tenant;
        if (saved.theme) state.theme = saved.theme;
        if (saved.done) state.done = saved.done;
        if (saved.quiz) state.quiz = pruneQuiz(saved.quiz);
      }
      // Progress from the previous version keyed checklist items that no longer
      // exist. A fuzzy remap would be wrong more often than right, so the old blob
      // is preserved untouched and the reader is told it is there.
      if (!raw && localStorage.getItem(LEGACY_KEY)) state.legacyFound = true;
    } catch (e) {
      /* private mode, corrupt JSON — start clean rather than fail to boot */
    }
  }

  function save() {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          tenant: state.tenant,
          theme: state.theme,
          done: state.done,
          quiz: state.quiz
        })
      );
    } catch (e) {
      /* storage full or unavailable — the app still works for this session */
    }
  }

  /* --- Tenant substitution ------------------------------------------------ */

  function tenant(text) {
    if (text == null) return "";
    var prefix = (state.tenant || "contoso").trim() || "contoso";
    return String(text).split("<tenant>").join(prefix);
  }

  /* --- Progress ----------------------------------------------------------- */

  function taskKey(labId, exId, taskId) {
    return labId + "/" + exId + "/" + taskId;
  }

  function isDone(labId, exId, taskId) {
    return !!state.done[taskKey(labId, exId, taskId)];
  }

  function setDone(labId, exId, taskId, value) {
    var k = taskKey(labId, exId, taskId);
    if (value) state.done[k] = true;
    else delete state.done[k];
    save();
  }

  function checkpointsOf(lab) {
    var out = [];
    (lab.exercises || []).forEach(function (ex) {
      (ex.tasks || []).forEach(function (t) {
        if (t.checkpoint) out.push({ exId: ex.id, taskId: t.id });
      });
    });
    return out;
  }

  function labProgress(lab) {
    var all = checkpointsOf(lab);
    if (!all.length) return { done: 0, total: 0, percent: 0 };
    var done = all.filter(function (c) {
      return isDone(lab.id, c.exId, c.taskId);
    }).length;
    return { done: done, total: all.length, percent: Math.round((done / all.length) * 100) };
  }

  function overallProgress(labs) {
    var total = 0;
    var done = 0;
    labs.forEach(function (lab) {
      var p = labProgress(lab);
      total += p.total;
      done += p.done;
    });
    return { done: done, total: total, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  /* --- Quiz --------------------------------------------------------------- */

  function quizKey(labId, qId) {
    return labId + "/" + qId;
  }

  function quizAnswer(labId, qId) {
    var v = state.quiz[quizKey(labId, qId)];
    return v === undefined ? null : v;
  }

  function setQuizAnswer(labId, qId, index) {
    state.quiz[quizKey(labId, qId)] = index;
    save();
  }

  /**
   * Per-skill readiness from quiz results. This is what turns the coverage view
   * from "which labs claim this bullet" into "how am I actually doing on it".
   */
  function skillScores(labs) {
    var map = {};
    labs.forEach(function (lab) {
      (lab.quiz || []).forEach(function (q) {
        var chosen = quizAnswer(lab.id, q.id);
        if (chosen === null) return;
        (q.skills || []).forEach(function (sid) {
          if (!map[sid]) map[sid] = { asked: 0, right: 0 };
          map[sid].asked++;
          if (chosen === q.correctIndex) map[sid].right++;
        });
      });
    });
    return map;
  }

  /* --- Theme -------------------------------------------------------------- */

  function applyTheme(theme) {
    state.theme = theme;
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
    save();
  }

  function effectiveTheme() {
    if (state.theme) return state.theme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function toggleTheme() {
    applyTheme(effectiveTheme() === "dark" ? "light" : "dark");
  }

  /* --- Export / import ---------------------------------------------------- */

  function exportProgress() {
    return JSON.stringify(
      {
        format: "md102-progress",
        version: 2,
        tenant: state.tenant,
        done: state.done,
        quiz: state.quiz
      },
      null,
      2
    );
  }

  function importProgress(json) {
    var data = JSON.parse(json);
    if (data.done) state.done = data.done;
    if (data.quiz) state.quiz = pruneQuiz(data.quiz);
    if (data.tenant) state.tenant = data.tenant;
    save();
  }

  function reset() {
    state.done = {};
    state.quiz = {};
    save();
  }

  root.AppState = {
    state: state,
    load: load,
    save: save,
    tenant: tenant,
    isDone: isDone,
    setDone: setDone,
    checkpointsOf: checkpointsOf,
    labProgress: labProgress,
    overallProgress: overallProgress,
    quizAnswer: quizAnswer,
    setQuizAnswer: setQuizAnswer,
    skillScores: skillScores,
    applyTheme: applyTheme,
    effectiveTheme: effectiveTheme,
    toggleTheme: toggleTheme,
    exportProgress: exportProgress,
    importProgress: importProgress,
    reset: reset
  };
})(window);
