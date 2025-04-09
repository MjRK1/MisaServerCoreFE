import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import commonJs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    commonJs(),
  ],
  css: {
    devSourcemap: false,
  },
  esbuild: {
    target: 'esnext'
  },
  server: {
    port: 8000
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  }
})
