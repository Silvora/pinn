import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'electron/main.ts',
      fileName: () => 'main.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: 'dist-electron/main',
    rollupOptions: {
      external: ['electron', 'node:path', 'node:url'],
    },
    sourcemap: true,
    target: 'node20',
  },
});
