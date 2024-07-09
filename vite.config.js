import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://167.172.244.10:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/http://localhost:8080, ''),
      },
    },
  },
})

