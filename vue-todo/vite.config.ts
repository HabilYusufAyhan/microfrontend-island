import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
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
      shared: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
  build: {
    target: "esnext",
  },
});
