/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        popular: "url('./image.jpg')",
      },
      colors: {
        main: "#1E40AF",
        secondary: "#2590EB",
        soft: "#3A3A3A",
      },
    },
  },
  plugins: [],
};
