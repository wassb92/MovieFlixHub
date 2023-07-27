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
        secondary: "#6366f1",
        soft: "#9333ea",
      },
    },
  },
  plugins: [],
};
