import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "date-fns": "date-fns/esm",
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      "/socket.io": {
        target: `http://localhost:8080`,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
