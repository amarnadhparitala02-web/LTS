import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Lets `npm run dev` talk to the local backend without CORS or env setup.
    proxy: { '/api': 'http://localhost:4000' },
  },
  test: { environment: 'node' },
})
