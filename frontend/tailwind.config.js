/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        principal: "#ff6984",
        secundario: "#fff1f2",
        btnSideBar1: "#ffa0a3",
        btnSideBar2: "#fdc6c6",
        btnSideBar3: "#ffe8e9",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

