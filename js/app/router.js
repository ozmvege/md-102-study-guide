/*
 * Hash router.
 *
 * Hash rather than History API because the site must behave identically on
 * file:// and on GitHub Pages, with no server rewrites and no 404 fallback.
 *
 *   #/                              overview
 *   #/lab/<labId>                   a lab
 *   #/lab/<labId>/e/<n>             scroll to exercise n
 *   #/lab/<labId>/e/<n>/t/<m>       scroll to task m of exercise n
 *   #/lab/<labId>/scripts           scroll to the lab's Scripts section
 *   #/lab/<labId>/troubleshooting   ... its Troubleshooting section
 *   #/lab/<labId>/quiz              ... its Knowledge check
 *   #/coverage                      objective coverage, ?skill=g3.t1.s2 to focus one
 *   #/reference/<topic>             personas | vms | licenses | errors | tracks
 */
(function (root) {
  "use strict";

  // Trailing sections are named rather than numbered: there is at most one of each
  // per lab, and a bare "#scripts" cannot be used because this is a hash router —
  // it would replace the route entirely and land the reader on the overview.
  var LAB_SECTIONS = { scripts: true, troubleshooting: true, quiz: true };

  function parse(hash) {
    var raw = String(hash || "").replace(/^#/, "");
    var qi = raw.indexOf("?");
    var query = {};
    if (qi >= 0) {
      raw.slice(qi + 1).split("&").forEach(function (pair) {
        if (!pair) return;
        var kv = pair.split("=");
        query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
      });
      raw = raw.slice(0, qi);
    }

    var parts = raw.split("/").filter(Boolean);
    if (!parts.length) return { view: "home", query: query };

    if (parts[0] === "lab" && parts[1]) {
      var route = { view: "lab", labId: parts[1], query: query, anchor: null };
      if (parts[2] === "e" && parts[3]) {
        route.anchor = "e" + parts[3];
        if (parts[4] === "t" && parts[5]) route.anchor += "-t" + parts[5];
      } else if (parts[2] && LAB_SECTIONS[parts[2]]) {
        route.anchor = parts[2];
      }
      return route;
    }

    if (parts[0] === "coverage") return { view: "coverage", query: query };
    if (parts[0] === "reference") return { view: "reference", topic: parts[1] || "personas", query: query };
    if (parts[0] === "search") return { view: "search", query: query };

    return { view: "home", query: query };
  }

  function current() {
    return parse(location.hash);
  }

  function go(path) {
    if (location.hash === "#" + path) {
      root.dispatchEvent(new Event("hashchange"));
      return;
    }
    location.hash = path;
  }

  function labPath(labId) {
    return "/lab/" + labId;
  }

  /** "/lab/<id>/scripts" — the deep link a Scripts cross-reference points at. */
  function sectionPath(labId, section) {
    return "/lab/" + labId + "/" + section;
  }

  function isLabSection(name) {
    return !!LAB_SECTIONS[name];
  }

  root.AppRouter = {
    parse: parse,
    current: current,
    go: go,
    labPath: labPath,
    sectionPath: sectionPath,
    isLabSection: isLabSection
  };
})(window);
