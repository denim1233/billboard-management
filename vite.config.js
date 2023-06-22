import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({

    esbuild: {
        loader: 'jsx',
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },

    plugins: [
        react(),
        laravel({
            input: ['resources/js/index.jsx'],
            refresh: true,
        }),
    ],
});

