/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        dark: "#070B15",
        100: "#04060C",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      height: {
        screen: ["100dvh", "100svh"],
      },
    },
  },
  plugins: [],
};
