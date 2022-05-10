const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    colors: {
      primary: '#222831',
      secondary: '#393e46',
      accent: '#00adb5',
      danger: '#950101',
      white: '#eeeeee',
    },
    extend: {},
  },
  plugins: [],
};
