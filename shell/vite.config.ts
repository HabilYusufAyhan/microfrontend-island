import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      remotes: {
        vueTodo: "http://localhost:3001/assets/remoteEntry.js",
        reactProfile: "http://localhost:3002/assets/remoteEntry.js",
      },
    }),
  ],
  server: {
    port: 3000,
    allowedHosts: [
      "https://thousand-wallet-screensaver-motor.trycloudflare.com",
    ],
  },
});
