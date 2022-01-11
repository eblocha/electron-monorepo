/* eslint-env node */

import { chrome } from '../../.electron-vendors.cache.json';
import { join } from 'path';
import { builtinModules } from 'module';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@shared': join(PACKAGE_ROOT, '..', 'shared', 'src'),
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  plugins: [react(), envCompatible()],
  base: '',
  server: {
    fs: {
      strict: true,
    },
    port: '3002'
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      external: [...builtinModules],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
};

export default config;
