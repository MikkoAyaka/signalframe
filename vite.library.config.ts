import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/design-system/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: "lib",
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
