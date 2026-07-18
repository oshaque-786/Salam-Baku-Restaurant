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

  build: {
    target: "es2022",

    modulePreload: {
      polyfill: true,
    },
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,

    assetsInlineLimit: 4096,

    /*
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react";
            }

            if (id.includes("firebase")) {
              return "firebase";
            }

            if (id.includes("motion")) {
              return "motion";
            }

            if (id.includes("lucide-react") || id.includes("@google/genai")) {
              return "vendor";
            }

            return "vendor";
          }
        },
      },
    },
    */
  },
});
