/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8884d8',  // Customize Tailwind colors if needed
        darkPriamry: '#6865A7',
        secondary: '#8884d854',
        darkText: "3d5170",
      },
    },
  },
  plugins: [],
}