/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
   content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          title: ["Calistoga", "serif"],
       },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
      });
    },
  ],
};
