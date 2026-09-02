import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const STATIC_ROUTES = [
  'about',
  'services',
  'services/laparoscopic-surgery',
  'services/hernia-surgery',
  'services/gallbladder-surgery',
  'services/gastrointestinal-surgery',
  'services/thyroid-surgery',
  'services/varicose-vein-surgery',
  'services/piles-fissure-fistula',
  'services/diabetic-foot-surgery',
  'services/breast-surgery',
  'services/trauma-emergency-surgery',
  'blog',
  'contact',
  'gallery',
  'privacy-policy',
  'terms-and-conditions',
  'disclaimer',
];

export default defineConfig(({ command }) => ({
  // Absolute base path — required for Cloudflare Pages SPA routing
  base: '/',
  plugins: [
    react(),
    {
      name: 'generate-route-html',
      closeBundle() {
        try {
          const indexHtmlPath = path.resolve(__dirname, 'dist/index.html');
          if (!fs.existsSync(indexHtmlPath)) return;

          const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

          // 1. Copy index.html to dist/404.html
          fs.writeFileSync(path.resolve(__dirname, 'dist/404.html'), indexHtmlContent, 'utf-8');

          // 2. Generate physical index.html for all static routes to guarantee 200 OK HTTP responses
          STATIC_ROUTES.forEach((route) => {
            const routeDir = path.resolve(__dirname, `dist/${route}`);
            fs.mkdirSync(routeDir, { recursive: true });
            fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtmlContent, 'utf-8');
          });

          console.log(`✓ Generated physical HTML route entrypoints for ${STATIC_ROUTES.length} static routes.`);
        } catch (e) {
          console.error('Failed in generate-route-html plugin:', e);
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
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['lucide-react'],
          'vendor-helmet': ['react-helmet-async'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react', 'react-helmet-async'],
  },
}));
