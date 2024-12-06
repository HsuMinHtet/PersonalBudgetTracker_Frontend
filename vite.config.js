import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local", // Use CSS Modules by default
      generateScopedName: "[name]__[local]___[hash:base64:5]", // Custom class naming pattern
      hashPrefix: "prefix", // Optional, adds a custom prefix to the generated class names
    },
  },
});
