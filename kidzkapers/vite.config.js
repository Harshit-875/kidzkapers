import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Explicit root configuration
  root: __dirname,
  publicDir: 'public',
  
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html' // Directly reference root-level index.html
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  server: {
    port: 5173,
    host: true,
    strictPort: true,
  },

  // Production base path
  base: '/',

  // CSS handling
  css: {
    devSourcemap: false,
    modules: {
      localsConvention: 'camelCase'
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@sanity/client',
      '@sanity/image-url'
    ],
    exclude: []
  },

  // Resolver configuration
  resolve: {
    alias: {
      '@': '/src',
      '~': '/public'
    }
  }
});