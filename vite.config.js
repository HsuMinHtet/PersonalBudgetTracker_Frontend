import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Set the base URL for the app
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html", // Explicitly specify the entry point
      },
    },
  },
});
