import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "shell",
      remotes: {
        vueTodo: {
          type: "module",
          name: "vueTodo",
          entry: "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "vueTodo",
        },
        reactProfile: {
          type: "module",
          name: "reactProfile",
          entry: "http://localhost:3002/remoteEntry.js",
          entryGlobalName: "reactProfile",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 3000,
    cors: true,
  },
  build: {
    target: "esnext",
  },
});
