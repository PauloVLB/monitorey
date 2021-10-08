module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0D1117",
        secondary: "#010409",
        cta: "#059669"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
