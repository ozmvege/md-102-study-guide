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
 *   #/coverage                      objective coverage, ?skill=g3.t1.s2 to focus one
 *   #/reference/<topic>             personas | vms | licenses | errors | tracks
 */
(function (root) {
  "use strict";

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

  root.AppRouter = { parse: parse, current: current, go: go, labPath: labPath };
})(window);
