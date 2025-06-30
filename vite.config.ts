import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      input: {
        // Nosso script de conteúdo que será injetado nas páginas
        content: resolve(__dirname, "src/content.tsx"),
      },
      output: {
        // Garante que o nome do arquivo de saída seja previsível
        entryFileNames: "[name].js",
        // Garante que os arquivos de assets também tenham nomes previsíveis se necessário
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
