

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import jsconfigPaths from "vite-jsconfig-paths";
import svgr from "vite-plugin-svgr";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react(), jsconfigPaths(), svgr()],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 19)),
    __VERSION__: JSON.stringify("6714f5f"),
  },
  optimizeDeps: {
    include: ['@react-aria/utils'],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
      ],
    },
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      'hooks': path.resolve(__dirname, './src/hooks'),
    }
  },
  build: {
    rollupOptions: {
      external: ['@hookform/resolvers/yup'],
      // Add this to handle problematic packages
      onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
          warning.message.includes('@react-aria/utils')) {
          return;
        }
        warn(warning);
      }
    }
  }
});
