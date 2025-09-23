import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ tell Vite that "@" = "src"
    },
  },
  server: {
    allowedHosts: [
      'ius.onrender.com',
      'localhost',
    ],
    host: true,
    port: 5173,
  },
})
