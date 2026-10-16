// Post-build: hashes every inline <script> in the exported HTML and injects a strict CSP <meta>.
// frame-ancestors can't live in <meta>, so it ships as a header in vercel.json.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const files = readdirSync("out").filter((f) => f.endsWith(".html")).map((f) => `out/${f}`);
for (const file of files) {
  let html = readFileSync(file, "utf8");
  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs ?? "") || !body) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body).digest("base64")}'`);
  }
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(" ")}`,
    // ponytail: React style props + GSAP inline styles need 'unsafe-inline' for styles; scripts stay hashed.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
  html = html.replace("<head>", `<head><meta http-equiv="Content-Security-Policy" content="${csp}">`);
  writeFileSync(file, html);
  console.log(`csp: ${file} (${hashes.size} inline scripts hashed)`);
}
