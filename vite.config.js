import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); // Chemin complet du fichier
const __dirname = dirname(__filename); // Dossier du fichier
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FormatPlus-Presentation/', // Chemin correspondant au nom du dépôt
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),    },
  },
})
