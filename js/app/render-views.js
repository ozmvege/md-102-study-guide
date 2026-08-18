/* Home, coverage and reference views. */
(function (root) {
  "use strict";

  var S = root.AppState;
  var R = root.RenderLab;
  var t = R.t;
  var esc = R.esc;
  var icon = R.icon;

  /* --- Home --------------------------------------------------------------- */

  function card(path, iconName, heading, blurb) {
    return (
      '<a class="card" href="#' + esc(path) + '"><b>' + icon(iconName) + " " + heading +
      "</b><span>" + blurb + "</span></a>"
    );
  }

  function renderHome(ctx) {
    var progress = S.overallProgress(ctx.labs);
    var cov = ctx.coverage;
    var minutes = ctx.labs.reduce(function (a, l) { return a + l.estimatedMinutes; }, 0);
    var handsOn = ctx.labs.filter(function (l) { return l.access === "hands-on"; }).length;

    var next = ctx.labs.find(function (l) {
      var p = S.labProgress(l);
      return p.total === 0 || p.done < p.total;
    }) || ctx.labs[0];

    var legacy = S.state.legacyFound
      ? '<aside class="callout callout--note"><div class="callout__label">' + icon("info") +
        "<span>note</span></div><div class=\"callout__body\">Progress from the previous version of this site is still stored in your browser. " +
        "Its checklist items no longer exist in this curriculum, so it was not migrated — a wrong mapping would be worse than a clean start. " +
        "Nothing has been deleted.</div></aside>"
      : "";

    return (
      '<article class="doc">' +
      "<h1>" + esc(ctx.outline.examCode) + " — " + esc(ctx.outline.examTitle) + "</h1>" +
      '<p class="lede">A hands-on lab curriculum aligned to the skills measured outline of ' +
      esc(ctx.outline.version) +
      ". The labs build one tenant from nothing, in an order where each depends only on the ones before it.</p>" +
      legacy +
      '<div class="stat">' +
      '<div class="stat__item"><b>' + progress.percent + "%</b><span>" + progress.done + " of " + progress.total + " checkpoints done</span></div>" +
      '<div class="stat__item"><b>' + ctx.labs.length + "</b><span>labs, " + handsOn + " hands-on</span></div>" +
      '<div class="stat__item"><b>' + Math.round(minutes / 60) + " h</b><span>of lab time</span></div>" +
      '<div class="stat__item"><b>' + cov.covered + "/" + cov.total + "</b><span>skill bullets covered</span></div>" +
      "</div>" +
      '<div class="cards">' +
      card("/lab/" + next.id, "play", "Continue — Lab " + next.number, t(next.title)) +
      card("/coverage", "target", "Objective coverage", "Every skill bullet, which lab teaches it, and how you are scoring.") +
      card("/reference/personas", "users", "The 20/5 seat budget", "Who exists in the tenant, and why the reserve matters.") +
      card("/reference/vms", "server", "Lab hardware", "Three Hyper-V virtual machines and the Android emulator.") +
      card("/reference/licenses", "lock", "Licence boundary", "What Microsoft 365 E5 covers, and what it does not.") +
      card("/reference/errors", "alert", "Error dictionary", "The codes worth recognising on sight.") +
      card("/reference/tracks", "calendar", "Study tracks", "Two-week sprint, six-week evenings, or weighted revision.") +
      "</div>" +
      renderCurriculum(ctx) +
      "</article>"
    );
  }

  function renderCurriculum(ctx) {
    var html = '<h2 id="curriculum">Curriculum</h2>';
    ctx.modules.forEach(function (mod) {
      var inMod = ctx.labs.filter(function (l) { return l.moduleId === mod.id; });
      if (!inMod.length) return;
      html +=
        "<h3>" + esc(mod.title) + "</h3><p>" + t(mod.description) + "</p>" +
        '<div class="tablewrap"><table><thead><tr><th>#</th><th>Lab</th><th>Access</th><th>Time</th></tr></thead><tbody>' +
        inMod.map(function (lab) {
          var p = S.labProgress(lab);
          var done = p.total > 0 && p.done === p.total;
          return (
            "<tr><td>" + lab.number + "</td>" +
            '<td><a href="#' + esc("/lab/" + lab.id) + '">' + t(lab.title) + "</a>" +
            (done ? ' <span class="nav__done">✓</span>' : "") + "</td>" +
            "<td>" + (lab.access === "hands-on" ? "Hands-on" : "Walkthrough") + "</td>" +
            '<td class="value">' + lab.estimatedMinutes + " min</td></tr>"
          );
        }).join("") +
        "</tbody></table></div>";
    });
    return html;
  }

  /* --- Coverage ----------------------------------------------------------- */

  function renderCoverage(ctx, query) {
    var focus = query && query.skill;
    var scores = S.skillScores(ctx.labs);
    var cov = ctx.coverage;

    var html =
      '<article class="doc"><h1>Exam objective coverage</h1>' +
      '<p class="lede">Every skill bullet from the ' + esc(ctx.outline.version) +
      " skills measured outline, and which lab teaches it. A bullet counts as covered only when a lab claims it as a <em>primary</em> objective — a lab that merely touches a topic does not count, because that is how coverage becomes a number that means nothing.</p>" +
      '<p><a href="' + esc(ctx.outline.sourceUrl) + '" target="_blank" rel="noopener noreferrer">Official skills measured outline</a></p>' +
      '<div class="stat">' +
      '<div class="stat__item"><b>' + cov.percent + "%</b><span>" + cov.covered + " of " + cov.total + " bullets covered</span></div>" +
      '<div class="stat__item"><b>' + cov.uncovered.length + "</b><span>bullets with no lab</span></div>" +
      "</div>";

    if (cov.uncovered.length) {
      html +=
        '<aside class="callout callout--warning"><div class="callout__label">' + icon("alert") +
        "<span>warning</span></div><div class=\"callout__body\">" + cov.uncovered.length +
        " skill bullets are not yet taught by any lab. They are highlighted below.</div></aside>";
    }

    cov.groups.forEach(function (g) {
      var pct = g.total ? Math.round((g.covered / g.total) * 100) : 0;
      html +=
        '<div class="covgroup"><div class="covgroup__head">' +
        '<span class="covgroup__title">' + esc(g.title) + "</span>" +
        '<span class="covgroup__meta">' + g.weightMin + "–" + g.weightMax + "% of exam · " +
        g.labCount + " labs · " + Math.round(g.minutes / 60) + " h</span>" +
        '<span class="covbar"><span style="width:' + pct + '%"></span></span>' +
        '<span class="covgroup__meta">' + g.covered + "/" + g.total + "</span>" +
        "</div>";

      g.topics.forEach(function (topic) {
        html += '<div class="covskill" style="background:var(--surface-2)"><div class="covskill__id"></div><div><strong>' +
          esc(topic.title) + "</strong></div></div>";

        topic.skills.forEach(function (skill) {
          var sc = scores[skill.id];
          var isFocus = focus === skill.id;
          html +=
            '<div class="covskill' + (skill.covered ? "" : " covskill--gap") + '" id="' + esc(skill.id) + '"' +
            (isFocus ? ' style="outline:2px solid var(--accent)"' : "") + ">" +
            '<div class="covskill__id">' + esc(skill.id) + "</div>" +
            "<div><div>" + esc(skill.text) + "</div>" +
            '<div class="covskill__labs">' +
            (skill.primary.length
              ? skill.primary.map(function (id) {
                  var lab = ctx.labById[id];
                  return lab ? '<a href="#/lab/' + esc(id) + '">Lab ' + lab.number + "</a>" : "";
                }).join("")
              : '<span style="color:var(--gap)">No lab teaches this yet</span>') +
            (skill.partial.length
              ? '<span style="color:var(--text-faint)">also touched by ' + skill.partial.length + " lab" + (skill.partial.length > 1 ? "s" : "") + "</span>"
              : "") +
            (sc ? '<span style="color:var(--text-muted)"> · quiz ' + sc.right + "/" + sc.asked + "</span>" : "") +
            "</div></div></div>";
        });
      });

      html += "</div>";
    });

    return html + "</article>";
  }

  /* --- Reference ---------------------------------------------------------- */

  function table(headers, rows) {
    return (
      '<div class="tablewrap"><table><thead><tr>' +
      headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      rows.map(function (r) {
        return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div>"
    );
  }

  function renderReference(ctx, topic) {
    var body = "";
    var title = "";

    if (topic === "personas") {
      title = "Identities and the 20/5 seat budget";
      var licensed = ctx.personas.filter(function (p) { return p.licensed; });
      body =
        '<p class="lede">Twenty licensed identities, five seats held in reserve, and three administrators that cost nothing because unlicensed admin access is enabled by default on tenants created after July 2021.</p>' +
        '<div class="stat"><div class="stat__item"><b>' + licensed.length + "</b><span>licensed seats</span></div>" +
        '<div class="stat__item"><b>' + (25 - licensed.length) + "</b><span>held in reserve</span></div>" +
        '<div class="stat__item"><b>' + (ctx.personas.length - licensed.length) + "</b><span>unlicensed admins</span></div></div>" +
        '<aside class="callout callout--important"><div class="callout__label">' + icon("alert") +
        "<span>important</span></div><div class=\"callout__body\">The reserve is not caution for its own sake. Group-based licensing assigns seats asynchronously; if the pool is empty when an account lands in <code>GRP-LIC-M365-E5</code>, the assignment fails silently and the only symptom is enrollment error <code>0x80180018</code> much later.</div></aside>" +
        table(
          ["Persona", "UPN", "Seat", "Used for"],
          ctx.personas.map(function (p) {
            return [
              "<strong>" + esc(p.display) + "</strong>" + (p.department ? '<span class="rownote">' + esc(p.department) + "</span>" : ""),
              "<code>" + esc(p.upn) + "</code>",
              p.licensed ? "E5" : "—",
              t(p.purpose)
            ];
          })
        );
    } else if (topic === "vms") {
      title = "Lab hardware";
      body =
        '<p class="lede">Three Generation 2 Hyper-V virtual machines with a virtual TPM, plus one Android emulator. The vTPM is not decoration: without it BitLocker cannot silently enable, Windows Hello cannot use hardware-backed keys, and the default compliance rules cannot pass — and each failure looks like a policy problem rather than a hardware one.</p>' +
        ctx.vms.map(function (vm) {
          return (
            '<div class="panel"><h3 style="margin-top:0">' + esc(vm.name) + "</h3><p>" + t(vm.role) + "</p>" +
            table(
              ["Setting", "Value"],
              [
                ["Generation", esc(vm.generation)],
                ["vTPM", esc(vm.vtpm)],
                ["Secure Boot", esc(vm.secureBoot)],
                ["Processors", esc(vm.cpu)],
                ["Memory", esc(vm.memory)],
                ["Disk", esc(vm.disk)],
                ["Operating system", esc(vm.os)],
                ["Network", esc(vm.network)]
              ].map(function (r) { return [r[0], '<span class="value">' + r[1] + "</span>"]; })
            ) +
            (vm.warning
              ? '<aside class="callout callout--warning"><div class="callout__label">' + icon("alert") +
                "<span>warning</span></div><div class=\"callout__body\">" + t(vm.warning) + "</div></aside>"
              : "") +
            "</div>"
          );
        }).join("");
    } else if (topic === "licenses") {
      title = "What your subscription includes";
      body =
        '<p class="lede">Roughly a quarter of the MD-102 objectives cover capabilities Microsoft 365 E5 does not include. Every claim below was checked against Microsoft Learn on the date shown.</p>' +
        table(
          ["Capability", "In E5?", "Notes", "Verified"],
          ctx.licenses.map(function (l) {
            return [
              "<strong>" + esc(l.name) + "</strong>",
              l.included
                ? '<span class="badge badge--handson">Yes</span>'
                : '<span class="badge badge--walkthrough">No</span>',
              t(l.notes) +
                (l.trial ? '<span class="rownote"><strong>Trial:</strong> ' + t(l.trial) + "</span>" : "") +
                (l.trialPath ? '<span class="rownote"><strong>Start at:</strong> ' + t(l.trialPath) + "</span>" : ""),
              '<a href="' + esc(l.source) + '" target="_blank" rel="noopener noreferrer">' + esc(l.verifiedOn || "source") + "</a>"
            ];
          })
        );
    } else if (topic === "errors") {
      title = "Error dictionary";
      body =
        '<p class="lede">The codes worth recognising on sight. Several are provoked deliberately in the labs so you meet them under controlled conditions rather than at 2am.</p>' +
        ctx.errors.map(function (e) {
          return (
            '<div class="panel"><h3 style="margin-top:0"><code>' + esc(e.code) + "</code> " +
            '<span class="badge">' + esc(e.area) + "</span></h3>" +
            "<p><strong>" + esc(e.symbol) + "</strong></p>" +
            "<h4>Root cause</h4><p>" + t(e.rootCause) + "</p>" +
            "<h4>Resolution</h4><p>" + t(e.resolution) + "</p></div>"
          );
        }).join("");
    } else if (topic === "tracks") {
      title = "Study tracks";
      body = ctx.tracks.map(function (track) {
        var rows = (track.days || []).map(function (d) {
          var labs = ctx.labs.filter(function (l) { return (d.modules || []).indexOf(l.moduleId) !== -1; });
          var mins = labs.reduce(function (a, l) { return a + l.estimatedMinutes; }, 0);
          return [
            "<strong>" + (track.id === "evening" ? "Week " : "Day ") + d.day + "</strong>",
            t(d.focus),
            labs.length ? labs.length + " labs" : "—",
            mins ? Math.round(mins / 60) + " h" : "—"
          ];
        });
        return (
          '<div class="panel"><h3 style="margin-top:0">' + esc(track.name) + "</h3>" +
          "<p><strong>" + esc(track.tagline) + "</strong></p><p>" + t(track.description) + "</p>" +
          (rows.length ? table(["", "Focus", "Labs", "Time"], rows) : "") +
          "</div>"
        );
      }).join("");
    } else {
      title = "Reference";
      body = "<p>Unknown reference topic.</p>";
    }

    return '<article class="doc"><h1>' + esc(title) + "</h1>" + body + "</article>";
  }

  root.RenderViews = { renderHome: renderHome, renderCoverage: renderCoverage, renderReference: renderReference };
})(window);
