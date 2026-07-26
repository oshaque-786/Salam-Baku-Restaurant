import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  // GitHub Pages Repository Base Path
  base: "/Salam-Baku-Restaurant/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== "true",
    watch: process.env.DISABLE_HMR === "true" ? null : {},
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
    ],
    exclude: [
      "firebase",
    ],
  },

  build: {
    target: "esnext",

    modulePreload: {
      polyfill: true,
    },

    sourcemap: false,

    cssCodeSplit: true,

    reportCompressedSize: true,

    chunkSizeWarningLimit: 1000,

    assetsInlineLimit: 2048,

    rollupOptions: {
      output: {
        generatedCode: "es2015",

        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("/react/") ||
            id.includes("react-dom") ||
            id.includes("scheduler")
          ) {
            return "react-vendor";
          }

          if (id.includes("firebase")) {
            return "firebase";
          }

          if (id.includes("recharts")) {
            return "charts";
          }

          if (id.includes("motion")) {
            return "motion";
          }

          if (id.includes("lucide-react")) {
            return "icons";
          }

          return "vendor";
        }
      },
    },
  },
});