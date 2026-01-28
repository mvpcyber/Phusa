import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base './' penting agar asset dimuat relatif (misal: ./assets/index.js)
  // Ini mencegah error 404 jika aplikasi di-host di subfolder
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
  define: {
    // Polyfill process.env agar tidak crash 'ReferenceError: process is not defined'
    'process.env': {},
    // Inject API KEY dengan aman
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});