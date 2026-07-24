import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves project sites below the repository name.
  base: process.env.GITHUB_ACTIONS ? "/sparx-ui/" : "/",
  plugins: [react(), tailwindcss()],
});
