import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Shell uses iframe-based Island Architecture - no Module Federation needed
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    cors: true,
  },
  build: {
    target: "esnext",
  },
});
