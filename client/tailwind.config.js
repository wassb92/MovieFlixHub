/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        popular: "url('./image.jpg')",
      },
      colors: {
        main: "#1F2937",
        secondary: "#4B5563",
        soft: "#9333ea",
      },
    },
  },
  plugins: [],
};
