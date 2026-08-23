/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-teal': '#122525',
        'teal-blue': '#018f8b',
        'mellow-gold': '#cc9955',
        'golden-brown': '#996d39',
        'snow-white': '#fffafa',
      },
      fontFamily: {
        sans: ['Host Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
