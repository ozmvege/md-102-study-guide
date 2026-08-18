/* Wiring: boot, routing, event delegation, targeted DOM updates. */
(function (root) {
  "use strict";

  var S = root.AppState;
  var Router = root.AppRouter;
  var M = root.MD102;

  var ctx = null;
  var els = {};

  function buildContext() {
    var byId = {};
    M.labs.forEach(function (l) { byId[l.id] = l; });

    var skillById = {};
    M.outline.groups.forEach(function (g) {
      g.topics.forEach(function (topic) {
        topic.skills.forEach(function (skill) {
          skillById[skill.id] = { skill: skill, topic: topic, group: g };
        });
      });
    });

    var moduleById = {};
    M.modules.forEach(function (m) { moduleById[m.id] = m; });

    var personaById = {};
    M.personas.forEach(function (p) { personaById[p.id] = p; });

    return {
      outline: M.outline,
      labs: M.labs,
      labById: byId,
      modules: M.modules,
      moduleById: moduleById,
      personas: M.personas,
      personaById: personaById,
      vms: M.vms,
      licenses: M.licenses,
      errors: M.errors,
      tracks: M.tracks,
      coverage: M.coverage,
      skillById: skillById
    };
  }

  /* --- Rendering ---------------------------------------------------------- */

  function render() {
    var route = Router.current();
    var activeLabId = route.view === "lab" ? route.labId : null;

    els.nav.innerHTML = root.RenderNav.renderNav(ctx, activeLabId);

    if (route.view === "lab") {
      var lab = ctx.labById[route.labId];
      if (!lab) {
        els.main.innerHTML =
          '<article class="doc"><h1>Lab not found</h1><p>No lab with the id <code>' +
          root.RenderLab.esc(route.labId) + '</code>. <a href="#/">Back to the overview</a>.</p></article>';
        els.rail.innerHTML = "";
      } else {
        els.main.innerHTML = root.RenderLab.renderLab(lab, ctx);
        els.rail.innerHTML = root.RenderLab.renderRail(lab);
        document.title = "Lab " + lab.number + ": " + stripMarkup(lab.title) + " — MD-102";
      }
    } else if (route.view === "coverage") {
      els.main.innerHTML = root.RenderViews.renderCoverage(ctx, route.query);
      els.rail.innerHTML = "";
      document.title = "Objective coverage — MD-102";
    } else if (route.view === "reference") {
      els.main.innerHTML = root.RenderViews.renderReference(ctx, route.topic);
      els.rail.innerHTML = "";
      document.title = "Reference — MD-102";
    } else {
      els.main.innerHTML = root.RenderViews.renderHome(ctx);
      els.rail.innerHTML = "";
      document.title = "MD-102 Lab Platform";
    }

    document.body.setAttribute("data-nav", "closed");
    scrollToTarget(route);
  }

  function stripMarkup(s) {
    return root.MD102Inline.toPlain(S.tenant(s));
  }

  function scrollToTarget(route) {
    if (route.view === "lab" && route.anchor) {
      // Exercise/task anchors are 1-based positions in the URL; resolve them to
      // the stable element ids so links survive an exercise being renamed.
      var lab = ctx.labById[route.labId];
      if (!lab) return;
      var m = /^e(\d+)(?:-t(\d+))?$/.exec(route.anchor);
      if (!m) return;
      var ex = lab.exercises[parseInt(m[1], 10) - 1];
      if (!ex) return;
      var id = ex.id;
      if (m[2]) {
        var task = ex.tasks[parseInt(m[2], 10) - 1];
        if (task) id = ex.id + "-" + task.id;
      }
      var el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }

  /* --- Targeted updates (never a full re-render) --------------------------- */

  /**
   * Ticking a checkpoint must not move the page. A full re-render would reset
   * scroll position, which on step 14 of 20 means being thrown back to the top
   * of the lab every time you tick something off.
   */
  function onCheckpointToggle(input) {
    var labId = input.getAttribute("data-lab");
    var exId = input.getAttribute("data-ex");
    var taskId = input.getAttribute("data-task");

    S.setDone(labId, exId, taskId, input.checked);

    var section = input.closest(".task");
    if (section) section.setAttribute("data-done", input.checked ? "true" : "false");

    var lab = ctx.labById[labId];
    if (lab) {
      var p = S.labProgress(lab);
      var strip = els.main.querySelector(".metastrip");
      if (strip) {
        var spans = strip.querySelectorAll("span");
        var last = spans[spans.length - 1];
        if (last && last.textContent.indexOf("Checkpoints") === 0) {
          last.innerHTML = "Checkpoints <b>" + p.done + " / " + p.total + "</b>";
        }
      }
      var eyebrow = els.main.querySelector(".labhead__eyebrow");
      if (eyebrow) {
        var doneBadge = eyebrow.querySelector(".badge--done");
        var complete = p.total > 0 && p.done === p.total;
        if (complete && !doneBadge) {
          eyebrow.insertAdjacentHTML("beforeend", '<span class="badge badge--done">' + root.RenderLab.icon("check") + "Complete</span>");
        } else if (!complete && doneBadge) {
          doneBadge.remove();
        }
      }
    }

    els.nav.innerHTML = root.RenderNav.renderNav(ctx, labId);
  }

  function onQuizAnswer(button) {
    var labId = button.getAttribute("data-quiz");
    var qId = button.getAttribute("data-q");
    var choice = parseInt(button.getAttribute("data-opt"), 10);
    if (S.quizAnswer(labId, qId) !== null) return;

    S.setQuizAnswer(labId, qId, choice);

    var lab = ctx.labById[labId];
    var q = (lab.quiz || []).find(function (x) { return x.id === qId; });
    if (!q) return;

    var box = button.closest(".quiz");
    var correct = choice === q.correctIndex;
    box.setAttribute("data-state", correct ? "correct" : "wrong");

    Array.prototype.forEach.call(box.querySelectorAll(".quiz__opt"), function (opt, j) {
      opt.disabled = true;
      opt.setAttribute("data-mark", j === q.correctIndex ? "correct" : j === choice ? "chosen-wrong" : "dim");
    });

    var fb = document.createElement("div");
    fb.className = "quiz__feedback";
    fb.innerHTML =
      "<strong>" + (correct ? "Correct." : "Not quite.") + "</strong> " +
      root.RenderLab.t(q.rationale) +
      (q.examTip
        ? '<div class="quiz__tip">' + root.RenderLab.icon("bulb") + " <strong>Exam tip:</strong> " + root.RenderLab.t(q.examTip) + "</div>"
        : "");
    box.appendChild(fb);
  }

  /* --- Toast -------------------------------------------------------------- */

  var toastTimer = null;
  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.classList.remove("is-visible"); }, 2200);
  }

  /* --- Events ------------------------------------------------------------- */

  function wire() {
    document.addEventListener("change", function (e) {
      var cb = e.target.closest("[data-checkpoint]");
      if (cb) onCheckpointToggle(cb);
    });

    document.addEventListener("click", function (e) {
      var quizOpt = e.target.closest(".quiz__opt");
      if (quizOpt && !quizOpt.disabled) {
        onQuizAnswer(quizOpt);
        return;
      }

      var copy = e.target.closest("[data-copy]");
      if (copy) {
        var code = copy.parentNode.querySelector("code");
        if (code && navigator.clipboard) {
          navigator.clipboard.writeText(code.textContent).then(function () {
            copy.textContent = "Copied";
            setTimeout(function () { copy.textContent = "Copy"; }, 1600);
          });
        }
        return;
      }

      var anchor = e.target.closest("[data-anchor]");
      if (anchor) {
        var id = anchor.getAttribute("data-anchor");
        var url = location.href.split("#")[0] + location.hash.split("?")[0];
        var target = document.getElementById(id);
        if (target) target.scrollIntoView();
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast("Link copied"); });
        return;
      }

      if (e.target.closest("[data-nav-toggle]")) {
        var open = document.body.getAttribute("data-nav") === "open";
        document.body.setAttribute("data-nav", open ? "closed" : "open");
        return;
      }

      if (e.target.closest(".scrim")) {
        document.body.setAttribute("data-nav", "closed");
        return;
      }

      if (e.target.closest("[data-theme-toggle]")) {
        S.toggleTheme();
        updateThemeButton();
        return;
      }

      if (e.target.closest("[data-export]")) {
        download("md102-progress.json", S.exportProgress());
        return;
      }

      if (e.target.closest("[data-reset]")) {
        if (confirm("Reset all checkpoints and quiz answers? This cannot be undone.")) {
          S.reset();
          render();
          toast("Progress reset");
        }
        return;
      }

      // Sidebar links close the drawer on narrow screens.
      if (e.target.closest(".nav__link")) document.body.setAttribute("data-nav", "closed");
    });

    els.tenant.addEventListener("input", function (e) {
      S.state.tenant = e.target.value || "contoso";
      S.save();
      render();
    });

    els.search.addEventListener("input", function (e) {
      S.state.search = e.target.value;
      els.nav.innerHTML = root.RenderNav.renderNav(ctx, Router.current().labId || null);
    });

    els.import.addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (ev) {
        try {
          S.importProgress(ev.target.result);
          render();
          toast("Progress imported");
        } catch (err) {
          toast("That file is not a valid progress export");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    root.addEventListener("hashchange", render);

    // Keyboard: / focuses search, [ and ] page between labs.
    document.addEventListener("keydown", function (e) {
      if (e.target.matches("input, textarea")) return;
      if (e.key === "/") {
        e.preventDefault();
        els.search.focus();
      } else if (e.key === "[" || e.key === "]") {
        var route = Router.current();
        if (route.view !== "lab") return;
        var i = ctx.labs.findIndex(function (l) { return l.id === route.labId; });
        var next = e.key === "]" ? ctx.labs[i + 1] : ctx.labs[i - 1];
        if (next) Router.go(Router.labPath(next.id));
      }
    });
  }

  function download(filename, text) {
    var blob = new Blob([text], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function updateThemeButton() {
    var dark = S.effectiveTheme() === "dark";
    els.themeIcon.setAttribute("href", dark ? "#i-sun" : "#i-moon");
    els.themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  /* --- Boot --------------------------------------------------------------- */

  function boot() {
    els.nav = document.getElementById("nav");
    els.main = document.getElementById("main");
    els.rail = document.getElementById("rail");
    els.tenant = document.getElementById("tenant");
    els.search = document.getElementById("search");
    els.import = document.getElementById("importFile");
    els.toast = document.getElementById("toast");
    els.themeBtn = document.querySelector("[data-theme-toggle]");
    els.themeIcon = els.themeBtn.querySelector("use");

    S.load();
    S.applyTheme(S.state.theme);
    ctx = buildContext();

    els.tenant.value = S.state.tenant;
    updateThemeButton();
    wire();
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
