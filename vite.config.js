// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  test: {
    environment: 'jsdom',              // Browser-ähnliche Umgebung
    setupFiles: './src/test/setupTests.js', // Setup-Datei laden
    globals: true,                     // optional: expect global verfügbar
  },
})
