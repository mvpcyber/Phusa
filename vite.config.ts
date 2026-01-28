import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' diset ke './' agar aplikasi bisa berjalan di subfolder hosting
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
  define: {
    // Mencegah error "process is not defined" di browser
    'process.env': {},
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});