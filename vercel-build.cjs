// Vercel build script — builds client-only SPA (no SSR / Cloudflare)
const { execSync } = require("child_process");

// Force non-Vercel mode so Cloudflare preset is not used
const env = { ...process.env, VERCEL: "0" };

console.log("Building SPA for Vercel using vite.config.vercel.ts...");
execSync("npx vite build --config vite.config.vercel.ts --mode production", { stdio: "inherit", env });

// Copy index.html as 404.html for SPA routing (client-side route fallback)
const fs = require("fs");
const path = require("path");
const distClient = path.join(__dirname, "dist", "client");
const indexHtml = path.join(distClient, "index.html");
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, path.join(distClient, "404.html"));
  console.log("Created 404.html for SPA routing");
} else {
  console.error("ERROR: index.html not found in build output!");
  process.exit(1);
}

console.log("Vercel SPA build complete!");