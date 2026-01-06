import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/site-orcamento-tcs/',
  plugins: [react()],
  assetsInclude: ['**/*.docx'],
})
