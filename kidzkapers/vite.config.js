import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import csp from 'vite-plugin-csp';



export default defineConfig({
  plugins: [react(),tailwindcss(),csp({
    policies: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "apis.google.com"],
      'connect-src': ["'self'", "https://api.sanity.io", "https://youtube.googleapis.com"],
    },
  }),],
  build: {
    sourcemap: false, // Prevents exposing source code
  },
  server: {
    port: 5173,
    allowedHosts: [
      '0126-2405-201-6004-70db-94e9-8723-780c-2dd8.ngrok-free.app'
    ]
  }
})
