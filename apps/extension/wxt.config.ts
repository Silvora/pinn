import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Pinn Capture',
    description: 'Capture fragmented knowledge into a shared RAG inbox.',
    permissions: ['storage', 'activeTab', 'scripting'],
    host_permissions: ['<all_urls>'],
  },
  vite: () => ({
    plugins: [tailwindcss(), tsconfigPaths()],
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
  }),
});
