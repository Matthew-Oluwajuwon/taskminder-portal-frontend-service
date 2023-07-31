/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      "primary-color": "#E15341",
    },
    backgroundImage: {
      logo: "url(/src/assets/images/logo.svg)",
    },
  },
  plugins: [],
}
