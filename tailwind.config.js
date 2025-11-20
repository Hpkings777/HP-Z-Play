/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#09090b',
          surface: 'rgba(255, 255, 255, 0.05)',
        },
        light: {
          bg: '#f8f9fa',
          surface: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
}