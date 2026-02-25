/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        togo: {
          green: '#006a4e',    // Vert drapeau
          yellow: '#ffce00',   // Jaune drapeau
          red: '#d1152a',      // Rouge drapeau
          light: '#f8f9fa',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
