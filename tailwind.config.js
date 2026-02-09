/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B2341', // Deep Navy
          light: '#1A3A5E',
        },
        accent: {
          DEFAULT: '#00AEEF', // Bright Cyan/Blue
          hover: '#0095CC',
        },
        text: {
          main: '#333333',
          light: '#666666',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
