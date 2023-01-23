import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    include: ["**/{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    css: true,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~test": path.resolve(__dirname, "./test"),
    },
  },
});
