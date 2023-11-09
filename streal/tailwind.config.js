/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./newComponents/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans"],
        manropeLight: ["ManropeLight", "sans"],
      },
      colors: {
        spiceOrange: "#F47A2E",
        dirtBrown: "#332C2C",
        lightGray: "#A3A3A3",
      },
    },
  },
  plugins: [],
};
