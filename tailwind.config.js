/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          400: "var(--clr-white-400)",
          500: "var(--clr-white-500)",
          600: "var(--clr-white-600)",
          700: "var(--clr-white-700)",
          800: "var(--clr-white-800)",
        },
        black: {
          300: "var(--clr-black-300)",
          400: "var(--clr-black-400)",
        },
        blue: {
          400: "hsl(var(--clr-blue-400) /  <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
