import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import "dotenv/config";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
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
})

      console.log(process.env.VITE_INDEV_API_URL)