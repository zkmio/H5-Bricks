module.exports = {
  content: [
    "./app/index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mui-blue': "#2196f3",
        'mui-deepBlue': "#1769aa"
      }
    },
  },
  plugins: [],
}