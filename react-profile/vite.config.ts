import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 3002,
    cors: true,
    origin: "http://localhost:3002",
  },
  preview: {
    port: 3002,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        iframe: resolve(__dirname, "iframe.html"),
      },
    },
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
