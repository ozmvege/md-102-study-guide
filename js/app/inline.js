/*
 * GENERATED FILE — DO NOT EDIT.
 * Copied from tools/lib/inline.mjs by tools/build.mjs so that the browser and
 * the Markdown emitter can never disagree about what the markup means.
 */
(function (root) {
  "use strict";
  /**
   * Restricted inline markup — the one text format used by every authored string.
   *
   * Exactly five productions are recognised. Everything else is escaped as text.
   *
   *   **text**        a UI element you click, or a literal label   -> <strong class="ui">
   *   `text`          code, path, cmdlet, UPN, GUID                -> <code>
   *   *text*          emphasis (tab names, document sections)      -> <em>
   *   [text](url)     link                                         -> <a>
   *   <tenant>        tenant token, substituted at render time     -> literal text
   *
   * Why a subset instead of HTML: the same string must render to HTML in the browser
   * AND to Markdown in LAB_GUIDE.md. Raw HTML can only do the first, which is exactly
   * why the old LAB_GUIDE.md had to be hand-maintained and drifted out of sync.
   *
   * IMPORTANT: this file must stay dependency-free and side-effect-free. The build
   * copies it verbatim to js/app/inline.js with the export line rewritten, so the
   * browser and the Markdown emitter can never disagree about what markup means.
   */
  
  const TOKEN =
    /(\[[^\]\n]+\]\([^)\s]+\))|(`[^`\n]+`)|(\*\*(?:[^*\n]|\*(?!\*))+\*\*)|(\*[^*\n]+\*)/g;
  
  const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;
  
  /** HTML-escape a plain text run. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  
  /**
   * Render inline markup to HTML. Every code path escapes, so no authored string
   * can inject markup — the five productions above are the only structure possible.
   */
  function toHtml(src) {
    if (src == null) return "";
    const s = String(src);
    const re = new RegExp(TOKEN.source, "g");
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(s)) !== null) {
      out += esc(s.slice(last, m.index));
      if (m[1]) {
        const link = LINK.exec(m[1]);
        const href = link[2];
        const safe = /^(https?:|mailto:|#)/i.test(href) ? href : "#";
        out +=
          '<a href="' +
          esc(safe) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(link[1]) +
          "</a>";
      } else if (m[2]) {
        out += "<code>" + esc(m[2].slice(1, -1)) + "</code>";
      } else if (m[3]) {
        out += '<strong class="ui">' + esc(m[3].slice(2, -2)) + "</strong>";
      } else if (m[4]) {
        out += "<em>" + esc(m[4].slice(1, -1)) + "</em>";
      }
      last = m.index + m[0].length;
    }
    out += esc(s.slice(last));
    return out;
  }
  
  /**
   * Render inline markup to Markdown. The markup subset was chosen to be a strict
   * subset of Markdown, so this is a passthrough — which is the whole point.
   */
  function toMarkdown(src) {
    return src == null ? "" : String(src);
  }
  
  /** Strip all markup, leaving plain text. Used for search indexes and titles. */
  function toPlain(src) {
    if (src == null) return "";
    return String(src)
      .replace(/\[([^\]\n]+)\]\([^)\s]+\)/g, "$1")
      .replace(/`([^`\n]+)`/g, "$1")
      .replace(/\*\*([^*\n]+)\*\*/g, "$1")
      .replace(/\*([^*\n]+)\*/g, "$1");
  }
  
  /**
   * Validate an authored string. Returns an array of human-readable problems.
   *
   * The hard rule is no raw HTML: a single stray `<` means someone reached past the
   * markup subset, and that string would render correctly in the browser but wrongly
   * in LAB_GUIDE.md. Rejecting it at build time is what keeps the two in sync.
   */
  function validateInline(src, where) {
    const errors = [];
    if (src == null) return errors;
    const s = String(src);
    const at = where ? where + ": " : "";
  
    // Inside a code span, "<" is code content: it is escaped on the HTML side and
    // meaningless to Markdown, so placeholders like `<name>` are legitimate. The
    // rule that matters is no raw "<" in *prose*, which is where HTML would leak in.
    const prose = s.replace(/`[^`\n]*`/g, "").replace(/<tenant>/g, "");
    if (prose.includes("<")) {
      const i = prose.indexOf("<");
      const snippet = prose.slice(Math.max(0, i - 30), i + 40);
      errors.push(
        at + "raw HTML or stray '<' is not allowed in prose — wrap placeholders in backticks (near: ..." + snippet + "...)"
      );
    }
    if (/&nbsp;|&amp;nbsp;|<br\s*\/?>/i.test(s)) {
      errors.push(at + "legacy HTML artifact (&nbsp; or <br/>) — use structured steps and parts instead");
    }
    if ((s.match(/`/g) || []).length % 2 !== 0) {
      errors.push(at + "unbalanced backtick");
    }
    const stars = (s.match(/\*/g) || []).length;
    if (stars % 2 !== 0) {
      errors.push(at + "unbalanced asterisk");
    }
    if (/\*\*\s*\*\*/.test(s)) {
      errors.push(at + "empty bold marker");
    }
    return errors;
  }
  
  root.MD102Inline = { esc: esc, toHtml: toHtml, toMarkdown: toMarkdown, toPlain: toPlain, validateInline: validateInline };
})(typeof window !== "undefined" ? window : globalThis);
