import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gpus': {
        target: 'http://127.0.0.1:3000', // Proxy API requests to your local backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
