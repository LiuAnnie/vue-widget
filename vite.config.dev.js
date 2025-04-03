import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: '/dev.html'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}) 