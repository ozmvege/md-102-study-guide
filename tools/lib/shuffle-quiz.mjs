/**
 * Deterministically shuffle quiz answer options at build time.
 *
 * Authors write the correct answer first — it is the natural way to draft a
 * question, and every lab in this repository was written that way. Left alone
 * that teaches the reader to pick option A and skip the thinking, which is the
 * one thing a knowledge check must not do.
 *
 * Shuffling here rather than in `content/` keeps both true: the source stays
 * readable with the answer on top, and neither the site nor LAB_GUIDE.md ever
 * shows a predictable position. It also means a new lab cannot reintroduce the
 * problem by being drafted the same obvious way.
 *
 * The permutation is seeded from the lab and question ids alone, so it is:
 *  - identical on every machine, which `build --check` requires;
 *  - stable across rebuilds, so a reader's saved answer — stored by option
 *    index in localStorage — still points at the option they picked.
 *
 * Adding, removing or reordering an option changes that question's option list
 * and therefore its rendered order, which will invalidate saved answers for
 * that one question. That is the same cost as editing the question text.
 */

/** FNV-1a over a string, returned as a 32-bit unsigned integer. */
function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** mulberry32 — a small, fast PRNG with a well-distributed 32-bit seed. */
function rng(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffle one question's options in place, moving correctIndex with them.
 *
 * Not idempotent — call it once per loaded lab. build.mjs does that from
 * loadContent, which imports fresh module objects on every build.
 */
function shuffleQuestion(labId, q) {
  const options = q.options;
  if (!Array.isArray(options) || options.length < 2) return;
  if (!Number.isInteger(q.correctIndex)) return;

  // Seed from the ids, never from the option text, so rewording an answer
  // does not silently move every option to a different place.
  const next = rng(hash32(labId + "/" + q.id));

  const order = options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }

  q.options = order.map((from) => options[from]);
  q.correctIndex = order.indexOf(q.correctIndex);
}

/** Shuffle every question in a lab's knowledge check. */
export function shuffleLabQuiz(lab) {
  if (!lab || !Array.isArray(lab.quiz)) return lab;
  for (const q of lab.quiz) shuffleQuestion(lab.id, q);
  return lab;
}
