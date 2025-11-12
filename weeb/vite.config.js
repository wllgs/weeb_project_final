import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,     // Assure la détection fiable des fichiers modifiés
      interval: 100         // Vérifie les changements toutes les 100 ms
    },
    headers: {
      'Cache-Control': 'no-store' // Indique au navigateur de ne rien garder en cache
    },
    strictPort: true,       // Si le port est déjà pris, Vite ne changera pas automatiquement
    port: 5173              // Tu peux le changer si besoin (ex. : 5174 si conflit)
  }
})

