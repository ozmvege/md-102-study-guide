#!/usr/bin/env node
/**
 * Minimal static file server for local preview.
 *
 * The site does not need a server — index.html opens fine from the filesystem.
 * This exists only so you can check behaviour over http:// the way GitHub Pages
 * will serve it. Zero dependencies, node: builtins only.
 *
 *   node tools/serve.mjs [port]
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve, extname, normalize } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2]) || 4102;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(req.url.split("?")[0]);
    // normalize() collapses ".." so a request cannot escape the repository root.
    const rel = normalize(url === "/" ? "/index.html" : url).replace(/^([/\\])+/, "");
    const abs = join(ROOT, rel);

    if (!abs.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    const info = await stat(abs);
    const file = info.isDirectory() ? join(abs, "index.html") : abs;
    const body = await readFile(file);

    res.writeHead(200, {
      "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
}).listen(PORT, () => {
  console.log("Serving " + ROOT + " on http://localhost:" + PORT);
});
