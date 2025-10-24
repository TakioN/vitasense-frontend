import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    allowedHosts: ["3949-175-193-64-118.ngrok-free.app"],
    // You can also add other options like port, proxy, etc.

    // host: true,
    // port: 5173,
  },
});
