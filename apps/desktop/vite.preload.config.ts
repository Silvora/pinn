import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'electron/preload.ts',
      fileName: () => 'preload.mjs',
      formats: ['es'],
    },
    minify: false,
    outDir: 'dist-electron/preload',
    rollupOptions: {
      external: ['electron'],
    },
    sourcemap: true,
    target: 'node20',
  },
});
