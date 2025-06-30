/** @type {import('tailwindcss').Config} */
export default {
  // Esta linha é a mais importante.
  // Garante que ele leia os arquivos do seu projeto.
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  // Na v4, o tema é composto aqui, em vez de estendido.
  // Deixá-lo vazio por enquanto está correto.
  theme: {
    extend: {},
  },
  plugins: [],
};
