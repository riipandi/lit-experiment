import { resolve } from 'node:path'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { defineConfig } from 'vite'
import litLightningcss from 'vite-plugin-lit-lightningcss'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    litLightningcss({
      include: /src\/.*\.ts$/,
      exclude: /node_modules/,
      lightningcss: { minify: true },
    }),
    tsconfigPaths(),
  ],
  publicDir: resolve('public'),
  envPrefix: ['PUBLIC_', 'VITE_'],
  clearScreen: true,
  build: {
    manifest: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024 * 4,
    rollupOptions: { input: resolve('index.html') },
    terserOptions: { format: { comments: false } },
    cssMinify: 'lightningcss',
    outDir: resolve('dist'),
    minify: false,
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  server: { port: 5173 },
  preview: { port: 5173 },
  esbuild: { legalComments: 'none' },
  optimizeDeps: { force: true },
})
