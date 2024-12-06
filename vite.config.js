import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Ensure this is set to the root
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html", // Entry point for Vite build
      },
    },
  },
});
