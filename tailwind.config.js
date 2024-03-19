/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLink: "#6f8fac",
        borderBottom: {
          before: "#dddddd63",
          after: "#5891ff",
        },
        transparent: "transparent",
        HomeBG: {
          main: "#2D3250",
          side: "#424769",
          content: "#7077A1",
        },
      },
      transitionProperty: {
        border: "border",
      },
    },
  },
  plugins: [],
};
