import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/calcguard-dashboard/'
})
=======
  base: '/calcguard-dashboard/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})
>>>>>>> d22ab79a2e9d382da08629bf7250cd4c74364a6e
