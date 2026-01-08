import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
  },
  build: {
    target: "esnext",
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "reactProfile",
      filename: "remoteEntry.js",
      exposes: {
        "./ProfileApp": "./src/ProfileApp.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
