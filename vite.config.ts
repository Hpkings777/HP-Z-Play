import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        fs: {
            // Allow serving files from one level up to the project root
            allow: ['..']
        }
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './app'),
          '@core': path.resolve(__dirname, './core'),
          '@games': path.resolve(__dirname, './games')
        }
      },
      publicDir: 'public',
      build: {
        rollupOptions: {
        }
      }
    };
});
