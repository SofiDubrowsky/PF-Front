/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#828385",
        "verde-feo": "#9AC71F",
        "light-grey": "#b9b8b6"
      },
    },
  },
  plugins: [],
};
