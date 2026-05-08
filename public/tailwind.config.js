/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./public/script.js", "./public/src/**/*.js"],
  theme: {
    extend: {
      colors: {
        accent: "#FF6B4A",
        softbg: "#FAF7F2",
        darktext: "#1A1A1A"
      }
    }
  },
  plugins: []
};

