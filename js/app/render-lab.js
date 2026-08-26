/*
 * Lab document rendering.
 *
 * One lab is one long document. There are no tabs: tabs hide a lab's own content
 * behind a click, break Ctrl+F across the lab, break printing, and make it
 * impossible to link to a step.
 *
 * Invariant: no authored string reaches innerHTML except through t() or esc().
 */
(function (root) {
  "use strict";

  var Inline = root.MD102Inline;
  var S = root.AppState;

  /**
   * The lab currently being rendered, so that a "#scripts" cross-reference in an
   * authored string can be resolved to the route for *this* lab. Rendering is
   * synchronous and one lab at a time, so a module-level cursor is enough and
   * saves threading the lab through every t() call site.
   */
  var currentLab = null;

  function resolveHref(href) {
    if (href.charAt(0) !== "#") return href;
    var section = href.slice(1);
    if (!currentLab || !AppRouter.isLabSection(section)) return href;
    return "#" + AppRouter.sectionPath(currentLab.id, section);
  }

  /** Authored inline markup -> safe HTML, with the tenant token substituted. */
  function t(text) {
    return Inline.toHtml(S.tenant(text), resolveHref);
  }

  /** Plain-text escape, for attributes and code. */
  function esc(text) {
    return Inline.esc(S.tenant(text));
  }

  var ACCESS = {
    "hands-on": { label: "Hands-on", cls: "badge--handson", icon: "check" },
    "walkthrough-license": { label: "Walkthrough — licence", cls: "badge--walkthrough", icon: "lock" },
    "walkthrough-device": { label: "Walkthrough — device", cls: "badge--walkthrough", icon: "lock" }
  };

  var CALLOUT_ICON = {
    note: "info",
    important: "alert",
    tip: "bulb",
    warning: "alert",
    caution: "alert"
  };

  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  /**
   * The "#" button beside a heading. It carries both the element id (to scroll to)
   * and the route that addresses it, because the two are not the same thing: ids
   * are stable slugs, routes are 1-based positions, and the button has to copy a
   * URL that survives being pasted into a fresh tab.
   */
  function anchorButton(id, path, label) {
    return (
      '<button class="anchor" type="button" data-anchor="' + esc(id) + '" data-link="' + esc(path) + '"' +
      ' title="Copy link to this ' + label + '">#</button>'
    );
  }

  /* --- Step parts --------------------------------------------------------- */

  function renderPart(part) {
    switch (part.kind) {
      case "substeps":
        return (
          '<ol class="substeps">' +
          part.items.map(function (i) { return "<li>" + t(i.text) + "</li>"; }).join("") +
          "</ol>"
        );

      case "callout":
        return (
          '<aside class="callout callout--' + esc(part.variant) + '">' +
          '<div class="callout__label">' + icon(CALLOUT_ICON[part.variant] || "info") +
          "<span>" + esc(part.variant) + "</span></div>" +
          '<div class="callout__body">' + t(part.text) + "</div>" +
          "</aside>"
        );

      case "code":
        return renderCode(part.code, part.lang, part.caption, part.copyable !== false);

      case "inputs":
        return (
          '<div class="tablewrap"><table class="settings"><thead><tr><th>Setting</th><th>Value</th></tr></thead><tbody>' +
          part.rows.map(function (r) {
            return (
              "<tr><td>" + t(r.label) + '</td><td class="value">' + t(String(r.value)) +
              (r.note ? '<span class="rownote">' + t(r.note) + "</span>" : "") +
              "</td></tr>"
            );
          }).join("") +
          "</tbody></table></div>"
        );

      case "table":
        return (
          '<div class="tablewrap"><table><thead><tr>' +
          part.headers.map(function (h) { return "<th>" + t(String(h)) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
          part.rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + t(String(c)) + "</td>"; }).join("") + "</tr>";
          }).join("") +
          "</tbody></table></div>"
        );

      case "verify":
        return (
          '<div class="verify"><span class="verify__label">Verify</span>' + t(part.text) +
          (part.expected ? renderCode(part.expected, "text", null, false) : "") +
          "</div>"
        );

      case "figure":
        return '<p class="lede">' + t(part.text) + "</p>";

      default:
        return "";
    }
  }

  function renderCode(code, lang, caption, copyable) {
    return (
      '<figure class="figure">' +
      (caption ? "<figcaption>" + t(caption) + "</figcaption>" : "") +
      '<div class="codewrap">' +
      (copyable ? '<button class="copybtn" type="button" data-copy>Copy</button>' : "") +
      '<pre><code data-lang="' + esc(lang || "text") + '">' + esc(code) + "</code></pre>" +
      "</div></figure>"
    );
  }

  function renderStep(step) {
    var html = "<li>" + t(step.text);
    if (step.nav && step.nav.length) {
      html +=
        '<span class="navpath">' +
        step.nav.map(function (n) { return "<b>" + t(String(n)) + "</b>"; }).join("<i>›</i>") +
        "</span>";
    }
    (step.parts || []).forEach(function (p) { html += renderPart(p); });
    return html + "</li>";
  }

  function renderTask(lab, ex, exIndex, task, index) {
    var id = ex.id + "-" + task.id;
    var done = task.checkpoint && S.isDone(lab.id, ex.id, task.id);
    var path = "/lab/" + lab.id + "/e/" + exIndex + "/t/" + index;

    var head =
      '<div class="task__head">' +
      (task.checkpoint
        ? '<input class="checkpoint__box" type="checkbox" ' +
          'data-checkpoint data-lab="' + esc(lab.id) + '" data-ex="' + esc(ex.id) + '" data-task="' + esc(task.id) + '"' +
          (done ? " checked" : "") +
          ' aria-label="Mark this task complete">'
        : "") +
      '<h3 id="' + esc(id) + '">Task ' + index + ": " + t(task.title) +
      anchorButton(id, path, "task") +
      "</h3></div>";

    var body =
      '<ol class="steps">' + task.steps.map(renderStep).join("") + "</ol>";

    var result = "";
    if (task.result) {
      result =
        '<div class="result"><div class="result__label">Results</div>' +
        "<div>" + t(task.result.text) + "</div>" +
        ((task.result.verify || []).length
          ? "<ul>" + task.result.verify.map(function (v) { return "<li>" + t(v.text) + "</li>"; }).join("") + "</ul>"
          : "") +
        "</div>";
    }

    return (
      '<section class="task" data-done="' + (done ? "true" : "false") + '" data-task-id="' + esc(id) + '">' +
      head + body + result + "</section>"
    );
  }

  function renderExercise(lab, ex, index) {
    return (
      '<section class="exercise" data-ex-id="' + esc(ex.id) + '">' +
      '<h2 id="' + esc(ex.id) + '">Exercise ' + index + ": " + t(ex.title) +
      anchorButton(ex.id, "/lab/" + lab.id + "/e/" + index, "exercise") +
      "</h2>" +
      (ex.intro ? "<p>" + t(ex.intro) + "</p>" : "") +
      ex.tasks.map(function (task, i) { return renderTask(lab, ex, index, task, i + 1); }).join("") +
      "</section>"
    );
  }

  /* --- Lab head ----------------------------------------------------------- */

  function renderHead(lab, ctx) {
    var access = ACCESS[lab.access] || ACCESS["hands-on"];
    var progress = S.labProgress(lab);
    var mod = ctx.moduleById[lab.moduleId];

    var eyebrow =
      '<div class="labhead__eyebrow">' +
      '<span class="badge badge--num">Lab ' + lab.number + "</span>" +
      '<span class="badge ' + access.cls + '">' + icon(access.icon) + access.label + "</span>" +
      (mod ? '<span class="badge">' + esc(mod.shortTitle) + "</span>" : "") +
      (progress.total && progress.done === progress.total
        ? '<span class="badge badge--done">' + icon("check") + "Complete</span>"
        : "") +
      "</div>";

    var meta =
      '<div class="metastrip">' +
      "<span>Estimated time <b>" + lab.estimatedMinutes + " min</b></span>" +
      "<span>Difficulty <b>" + esc(lab.difficulty) + "</b></span>" +
      "<span>Exercises <b>" + lab.exercises.length + "</b></span>" +
      (progress.total ? "<span>Checkpoints <b>" + progress.done + " / " + progress.total + "</b></span>" : "") +
      "</div>";

    var gate = "";
    if (lab.access !== "hands-on") {
      gate =
        '<aside class="callout callout--warning">' +
        '<div class="callout__label">' + icon("lock") + "<span>Read-only in this lab</span></div>" +
        '<div class="callout__body">' + t(lab.accessReason) + "</div></aside>";
    }

    var objectives =
      '<div class="panel"><h4>Objectives</h4><p>After completing this lab, you will be able to:</p>' +
      '<ul class="plain">' + lab.objectives.map(function (o) { return "<li>" + t(o) + "</li>"; }).join("") + "</ul></div>";

    var primary = (lab.skills || []).filter(function (s) { return s.depth === "primary"; });
    var skills = "";
    if (primary.length) {
      skills =
        '<div class="panel"><h4>Exam objectives covered</h4>' +
        primary.map(function (s) {
          var hit = ctx.skillById[s.id];
          return (
            '<a class="skillchip" href="#/coverage?skill=' + esc(s.id) + '">' +
            "<code>" + esc(s.id) + "</code><span>" + (hit ? t(hit.skill.text) : "unknown") + "</span></a>"
          );
        }).join("") +
        "</div>";
    }

    var rq = lab.requires || {};
    var prereqRows = [];
    if ((rq.labs || []).length) {
      prereqRows.push(
        "<li>Completed labs: " +
        rq.labs.map(function (id) {
          var dep = ctx.labById[id];
          return dep
            ? '<a href="#' + AppRouter.labPath(id) + '">Lab ' + dep.number + " — " + t(dep.title) + "</a>"
            : esc(id);
        }).join(", ") +
        "</li>"
      );
    }
    if ((rq.licenses || []).length) prereqRows.push("<li>Licences: " + rq.licenses.map(esc).join(", ") + "</li>");
    if ((rq.roles || []).length) prereqRows.push("<li>Roles: " + rq.roles.map(esc).join(", ") + "</li>");
    if ((rq.platforms || []).length) {
      prereqRows.push(
        "<li>Devices and portals: " +
        rq.platforms.map(function (p) { return esc(p.id + (p.os ? " (" + p.os + ")" : "")); }).join(", ") +
        "</li>"
      );
    }
    if ((rq.personas || []).length) {
      prereqRows.push(
        "<li>Personas: " +
        rq.personas.map(function (id) {
          var p = ctx.personaById[id];
          return esc(p ? p.display : id);
        }).join(", ") +
        "</li>"
      );
    }
    var prereqs = prereqRows.length
      ? '<div class="panel"><h4>Prerequisites</h4><ul class="plain">' + prereqRows.join("") + "</ul></div>"
      : "";

    return (
      eyebrow +
      "<h1>" + t(lab.title) + "</h1>" +
      meta +
      gate +
      "<h4>Lab scenario</h4><p>" + t(lab.scenario) + "</p>" +
      objectives +
      prereqs +
      skills
    );
  }

  /* --- Trailing sections -------------------------------------------------- */

  function renderScripts(lab) {
    if (!(lab.scripts || []).length) return "";
    return (
      '<section class="exercise"><h2 id="scripts">Scripts' +
      anchorButton("scripts", AppRouter.sectionPath(lab.id, "scripts"), "section") + "</h2>" +
      lab.scripts.map(function (s) {
        return (
          "<h3>" + t(s.title) + "</h3>" +
          (s.note ? '<aside class="callout callout--note"><div class="callout__label">' + icon("info") +
            "<span>note</span></div><div class=\"callout__body\">" + t(s.note) + "</div></aside>" : "") +
          renderCode(s.code, s.lang, null, true)
        );
      }).join("") +
      "</section>"
    );
  }

  function renderTroubleshooting(lab) {
    if (!(lab.troubleshooting || []).length) return "";
    return (
      '<section class="exercise"><h2 id="troubleshooting">Troubleshooting' +
      anchorButton("troubleshooting", AppRouter.sectionPath(lab.id, "troubleshooting"), "section") + "</h2>" +
      lab.troubleshooting.map(function (item) {
        return (
          '<div class="panel">' +
          "<h4>Symptom</h4><p>" + t(item.symptom) + "</p>" +
          "<h4>Root cause</h4><p>" + t(item.rootCause) + "</p>" +
          (item.diagnostic ? "<h4>Diagnostic</h4>" + renderCode(item.diagnostic.code, item.diagnostic.lang, null, true) : "") +
          "<h4>Resolution</h4><p>" + t(item.resolution) + "</p>" +
          ((item.errorCodes || []).length
            ? '<h4>Error codes</h4><p>' + item.errorCodes.map(function (c) {
                return '<a class="skillchip" href="#/reference/errors"><code>' + esc(c) + "</code></a>";
              }).join("") + "</p>"
            : "") +
          "</div>"
        );
      }).join("") +
      "</section>"
    );
  }

  function renderQuiz(lab) {
    if (!(lab.quiz || []).length) return "";
    return (
      '<section class="exercise"><h2 id="quiz">Knowledge check' +
      anchorButton("quiz", AppRouter.sectionPath(lab.id, "quiz"), "section") + "</h2>" +
      lab.quiz.map(function (q, i) {
        var chosen = S.quizAnswer(lab.id, q.id);
        var answered = chosen !== null;
        var correct = answered && chosen === q.correctIndex;

        var opts = q.options.map(function (opt, j) {
          var mark = "";
          if (answered) {
            if (j === q.correctIndex) mark = "correct";
            else if (j === chosen) mark = "chosen-wrong";
            else mark = "dim";
          }
          return (
            '<button class="quiz__opt" type="button" data-quiz="' + esc(lab.id) + '" data-q="' + esc(q.id) + '" data-opt="' + j + '"' +
            (answered ? " disabled" : "") +
            (mark ? ' data-mark="' + mark + '"' : "") +
            ">" + t(opt) + "</button>"
          );
        }).join("");

        var feedback = answered
          ? '<div class="quiz__feedback"><strong>' +
            (correct ? "Correct." : "Not quite.") +
            "</strong> " + t(q.rationale) +
            (q.examTip ? '<div class="quiz__tip">' + icon("bulb") + " <strong>Exam tip:</strong> " + t(q.examTip) + "</div>" : "") +
            "</div>"
          : "";

        return (
          '<div class="quiz" data-state="' + (answered ? (correct ? "correct" : "wrong") : "new") + '">' +
          '<div class="quiz__q">Question ' + (i + 1) + ". " + t(q.question) + "</div>" +
          opts + feedback + "</div>"
        );
      }).join("") +
      "</section>"
    );
  }

  function renderPager(lab, ctx) {
    var i = ctx.labs.indexOf(lab);
    var prev = i > 0 ? ctx.labs[i - 1] : null;
    var next = i < ctx.labs.length - 1 ? ctx.labs[i + 1] : null;
    return (
      '<nav class="pager">' +
      (prev
        ? '<a href="#' + AppRouter.labPath(prev.id) + '"><span>← Lab ' + prev.number + "</span><b>" + t(prev.title) + "</b></a>"
        : "<span></span>") +
      (next
        ? '<a href="#' + AppRouter.labPath(next.id) + '" style="text-align:end"><span>Lab ' + next.number + " →</span><b>" + t(next.title) + "</b></a>"
        : "<span></span>") +
      "</nav>"
    );
  }

  function renderLab(lab, ctx) {
    currentLab = lab;
    return (
      '<article class="doc">' +
      renderHead(lab, ctx) +
      lab.exercises.map(function (ex, i) { return renderExercise(lab, ex, i + 1); }).join("") +
      renderScripts(lab) +
      renderTroubleshooting(lab) +
      renderQuiz(lab) +
      renderPager(lab, ctx) +
      "</article>"
    );
  }

  /** The "on this page" rail: exercises and their tasks. */
  function renderRail(lab) {
    currentLab = lab;
    var links = lab.exercises.map(function (ex, i) {
      var tasks = ex.tasks.map(function (task, j) {
        return (
          '<a class="rail__link rail__link--task" href="#/lab/' + esc(lab.id) + "/e/" + (i + 1) + "/t/" + (j + 1) + '">' +
          "Task " + (j + 1) + ". " + t(task.title) + "</a>"
        );
      }).join("");
      return (
        '<a class="rail__link" href="#/lab/' + esc(lab.id) + "/e/" + (i + 1) + '">Exercise ' + (i + 1) + ". " + t(ex.title) + "</a>" + tasks
      );
    }).join("");

    // These must be full routes, not bare "#scripts". This is a hash router, so a
    // bare fragment replaces the whole route and the reader lands on the overview.
    var extras = "";
    function extra(section, label) {
      return '<a class="rail__link" href="#' + AppRouter.sectionPath(lab.id, section) + '">' + label + "</a>";
    }
    if ((lab.scripts || []).length) extras += extra("scripts", "Scripts");
    if ((lab.troubleshooting || []).length) extras += extra("troubleshooting", "Troubleshooting");
    if ((lab.quiz || []).length) extras += extra("quiz", "Knowledge check");

    return '<div class="rail__title">On this page</div>' + links + extras;
  }

  root.RenderLab = { renderLab: renderLab, renderRail: renderRail, icon: icon, t: t, esc: esc, renderCode: renderCode };
})(window);
