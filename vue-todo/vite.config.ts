import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: "vueTodo",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoApp": "./src/TodoApp.ts",
      },
      shared: {
        vue: { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  server: {
    port: 3001,
    cors: true,
    origin: "http://localhost:3001",
  },
  preview: {
    port: 3001,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
  },
});
