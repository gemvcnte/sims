// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@config": "/src/config",
      "@utils": "/src/utils",
      "@pages": "/src/pages",
      "@hooks": "/src/hooks",
      "@contexts": "/src/contexts",
    },
  },
});
