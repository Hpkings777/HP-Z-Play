import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: {
          host: '3000-iy0qd9v2w5yjiz3v5r1r1-91219ab7.manus-asia.computer',
          protocol: 'wss',
          clientPort: 443,
        },
        allowedHosts: ['3001-iy0qd9v2w5yjiz3v5r1r1-91219ab7.manus-asia.computer', '3000-iy0qd9v2w5yjiz3v5r1r1-91219ab7.manus-asia.computer'],
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './app'),
          '@core': path.resolve(__dirname, './core'),
          '@games': path.resolve(__dirname, './games')
        }
      }
    };
});
