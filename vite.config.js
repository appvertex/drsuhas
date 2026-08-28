import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ command }) => ({
  // Absolute base path — required for Cloudflare Pages SPA routing (lazy chunks must resolve from site root)
  base: '/',
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        try {
          const indexHtml = path.resolve(__dirname, 'dist/index.html');
          const fallbackHtml = path.resolve(__dirname, 'dist/404.html');
          if (fs.existsSync(indexHtml)) {
            fs.copyFileSync(indexHtml, fallbackHtml);
          }
        } catch (e) {
          console.error('Failed to copy index.html to 404.html:', e);
        }
      },
    },
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@data': path.resolve(__dirname, './src/data'),
      '@config': path.resolve(__dirname, './src/config'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Manual chunks: vendor libraries separate from app code
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['lucide-react'],
          'vendor-helmet': ['react-helmet-async'],
        },
        // Asset naming with content hash for cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Raise chunk warning threshold slightly
    chunkSizeWarningLimit: 600,
  },

  // Performance: preload module directives
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react', 'react-helmet-async'],
  },
}));
