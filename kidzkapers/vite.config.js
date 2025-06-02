import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
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

  base: '/', // <-- crucial for Netlify

  css: {
    devSourcemap: false,
    modules: {
      localsConvention: 'camelCase'
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@sanity/client',
      '@sanity/image-url'
    ],
    exclude: []
  },

  resolve: {
    alias: {
      '@': '/src',
      '~': '/public'
    }
  }
});
