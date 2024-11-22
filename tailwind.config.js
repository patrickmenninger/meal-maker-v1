/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            sage_green: '#A8D5BA',
            olive_green: '#7A9A92',
            mint_green: '#D9F1E0',
            warm_beige: '#F5F5F1',
            charcoal_gray: '#4C4C4C',
            soft_white: '#FFFFFF',
        },
        fontFamily: {
            sans: ["Roboto", "sans-serif"]
        },
        gridTemplateColumns: {
            '70/30': '70% 28%',
        }
    },
  },
  plugins: [],
}

