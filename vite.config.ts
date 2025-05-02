import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [litCss({ exclude: './src/styles/theme.css' }), tsconfigPaths()],
  publicDir: resolve('public'),
  envPrefix: ['PUBLIC_', 'VITE_'],
  clearScreen: true,
  build: {
    manifest: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024 * 4,
    rollupOptions: { input: resolve('index.html') },
    terserOptions: { format: { comments: false } },
    outDir: resolve('dist'),
    minify: false,
  },
  css: { devSourcemap: true },
  server: { port: 5173 },
  preview: { port: 5173 },
  esbuild: { legalComments: 'none' },
  optimizeDeps: { force: true },
})
