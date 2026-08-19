/* Sidebar syllabus navigation. */
(function (root) {
  "use strict";

  var S = root.AppState;
  var R = root.RenderLab;

  function matches(lab, needle) {
    if (!needle) return true;
    var hay = [
      lab.title,
      lab.scenario,
      (lab.keyConcepts || []).join(" "),
      (lab.objectives || []).join(" "),
      (lab.exercises || []).map(function (e) {
        return e.title + " " + e.tasks.map(function (x) { return x.title; }).join(" ");
      }).join(" ")
    ].join(" ").toLowerCase();
    return hay.indexOf(needle) !== -1;
  }

  function renderNav(ctx, activeLabId) {
    var needle = (S.state.search || "").trim().toLowerCase();
    var visible = ctx.labs.filter(function (l) { return matches(l, needle); });

    if (!visible.length) {
      return '<p class="nav__empty">No labs match “' + R.esc(S.state.search) + "”.</p>";
    }

    var html = "";
    ctx.modules.forEach(function (mod) {
      var inMod = visible.filter(function (l) { return l.moduleId === mod.id; });
      if (!inMod.length) return;

      var total = 0;
      var done = 0;
      inMod.forEach(function (l) {
        var p = S.labProgress(l);
        total += p.total;
        done += p.done;
      });

      html +=
        '<div class="nav__section"><div class="nav__module"><span>' +
        R.esc(mod.shortTitle) +
        "</span>" +
        (total ? '<span class="nav__progress">' + done + "/" + total + "</span>" : "") +
        "</div>";

      inMod.forEach(function (lab) {
        var p = S.labProgress(lab);
        var complete = p.total > 0 && p.done === p.total;
        html +=
          '<a class="nav__link" href="#' + R.esc("/lab/" + lab.id) + '"' +
          (lab.id === activeLabId ? ' aria-current="page"' : "") +
          '><span class="nav__num">' + lab.number + "</span>" +
          "<span>" + R.t(lab.title) +
          (complete ? ' <span class="nav__done">✓</span>' : "") +
          (lab.access !== "hands-on" ? ' <span class="nav__lock" title="Walkthrough">◻</span>' : "") +
          "</span></a>";
      });

      html += "</div>";
    });

    return html;
  }

  root.RenderNav = { renderNav: renderNav, matches: matches };
})(window);
