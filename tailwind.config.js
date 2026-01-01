/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // ✅ include your JSX files
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dark': '#1D4ED8'
      }
    },
  },
  plugins: [],
}
