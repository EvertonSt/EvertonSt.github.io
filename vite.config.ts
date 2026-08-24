import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/EvertonSt.github.io/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
