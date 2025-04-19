import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production'
          ? process.env.VITE_BACKEND_URL // Use backend URL in production
          : 'http://localhost:5000', // Use localhost in development
        changeOrigin: true,
        secure: false, // Disable SSL verification for local development
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.png'], // Ensure Vite processes image files
});
