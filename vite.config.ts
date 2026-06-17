// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Disable Cloudflare for Vercel builds and use Vercel preset instead.
const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: isVercel ? "vercel" : undefined,
    },
  },
  cloudflare: isVercel ? false : undefined,
});