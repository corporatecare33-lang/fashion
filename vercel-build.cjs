// Vercel build script - builds client-only SPA (no SSR / Cloudflare)
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Force non-Vercel mode so Cloudflare preset is used (which works locally)
// We only deploy the client output anyway
const env = { ...process.env, VERCEL: "0" };

console.log("Building SPA for Vercel...");
execSync("npx vite build --mode production", { stdio: "inherit", env });

// Copy client build to .vercel/output/static
const distClient = path.join(__dirname, "dist", "client");
const vercelStatic = path.join(__dirname, ".vercel", "output", "static");

if (fs.existsSync(distClient)) {
  fs.mkdirSync(vercelStatic, { recursive: true });

  const entries = fs.readdirSync(distClient);
  for (const entry of entries) {
    const src = path.join(distClient, entry);
    const dest = path.join(vercelStatic, entry);
    fs.cpSync(src, dest, { recursive: true });
  }
  console.log("Copied dist/client to .vercel/output/static");
}

// Copy index.html as 404.html for SPA routing
const indexHtml = path.join(vercelStatic, "index.html");
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, path.join(vercelStatic, "404.html"));
  console.log("Created 404.html for SPA routing");
}

console.log("Vercel build complete!");