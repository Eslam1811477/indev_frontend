import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,        
    strictPort: true, 
    proxy: {
      "/auth": {
        target: process.env.VITE_INDEV_API_URL,
        changeOrigin: true,
      },
      "/api": {
        target: process.env.VITE_INDEV_API_URL,
        changeOrigin: true,
      },
    },
  },
});
