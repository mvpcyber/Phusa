import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' diset ke './' agar aplikasi bisa berjalan di subfolder hosting atau domain utama tanpa masalah path absolute
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
  // Mengganti process.env.API_KEY dengan nilai sebenarnya saat proses build
  // Pastikan environment variable API_KEY tersedia di sistem saat menjalankan 'npm run build'
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});