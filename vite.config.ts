import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	publicDir: resolve("public"),
	envPrefix: ["PUBLIC_", "VITE_"],
	clearScreen: true,
	build: {
		manifest: true,
		emptyOutDir: true,
		chunkSizeWarningLimit: 1024 * 4,
		rollupOptions: { input: resolve("index.html") },
		terserOptions: { format: { comments: false } },
		outDir: resolve("dist"),
		minify: false,
	},
	server: { port: 5173 },
	preview: { port: 5173 },
	esbuild: { legalComments: "none" },
	optimizeDeps: { force: true },
});
