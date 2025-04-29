import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import commonJs from "vite-plugin-commonjs";
import { federation } from '@module-federation/vite';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    commonJs(),
    federation({
      name: 'core',
      remotes: {
        misa_files: {
          entry: `${process.env.MISA_FILES_ENTRY_HOST}:${process.env.MISA_FILES_ENTRY_PORT}/remoteEntry.js`,
          type: 'module',
          name: 'misa_files',
        },
      },
      shared: {
        "react": {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'react-router-dom': {
          singleton: true,
        },
        'antd': {
          singleton: true,
        },
        'dayjs': {
          singleton: true,
        }
      },
    })
  ],
  css: {
    devSourcemap: false,
  },
  esbuild: {
    target: 'esnext'
  },
  server: {
    port: Number(process.env.PORT) ?? 8000
  },
  preview: {
    port: Number(process.env.PORT) ?? 8000,
    host: process.env.HOST ?? "localhost",
    allowedHosts: ['misaserver.ru', 'localhost'],
  },
  base: '/core',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
