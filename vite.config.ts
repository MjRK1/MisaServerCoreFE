import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import commonJs from "vite-plugin-commonjs";
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import * as path from 'node:path';
dotenv.config();
const isProd = process.env.IS_PROD === 'true';
const getRemoteEntry = () => {
  return isProd
    ? `${process.env.MISA_FILES_ENTRY_HOST}/remoteEntry.js`
    : 'http://localhost:8001/files/assets/remoteEntry.js';
};

export default defineConfig({
  plugins: [
    // tsconfigPaths(),
    react(),
    commonJs(),
    federation({
      name: 'core',
      remotes: {
        misa_files: `promise new Promise(resolve => {
          resolve('${getRemoteEntry()}')
        })`,
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  server: {
    port: Number(process.env.PORT) ?? 8000
  },
  preview: {
    port: Number(process.env.PORT) ?? 8000,
    host: process.env.HOST ?? "localhost",
    allowedHosts: ['misaserver.ru', 'localhost'],
  },
  resolve: {
    alias: {
      'services': path.resolve(__dirname, 'src/services'),
      'commonComponents': path.resolve(__dirname, 'src/commonComponents'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'components': path.resolve(__dirname, 'src/components'),
      'common': path.resolve(__dirname, 'src/common'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'types': path.resolve(__dirname, 'src/types'),
      'src': path.resolve(__dirname, 'src'), // если используется
    },
  },
  base: '/core',
  build: {
    outDir: 'dist',
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
