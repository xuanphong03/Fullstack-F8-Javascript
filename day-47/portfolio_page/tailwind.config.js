/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        17: '72px',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      aspectRatio: {
        '2/1': '2 / 1',
      },
    },
  },
  plugins: [],
};
