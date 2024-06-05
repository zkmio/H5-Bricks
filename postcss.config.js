module.exports = {
  purge: ['./app/index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './lib/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};