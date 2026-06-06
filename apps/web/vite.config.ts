import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: '@/components/ui',
        replacement: fileURLToPath(new URL('../../packages/ui/src/components', import.meta.url)),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
      },
    ],
  },
  server: {
    port: 3000,
  },
});
