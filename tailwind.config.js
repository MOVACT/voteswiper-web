module.exports = {
  purge: [
    './pages/**/*.ts',
    './components/**/*.tsx',
    './pages/**/*.js',
    './components/**/*.jsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#59568b',
          'light-blue': '#eff3ff',
          highlight: '#E6E90F'
        },
      },
      screens: {
        'print': {'raw': 'print'},
      },
      boxShadow: {
        xl: '0px 0.7rem 3rem 0px rgba(0,0,0,0.25)'
      }
    },
  },
  variants: {
    extend: {
      outline: ['focus-visible'],
      ringWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringOpacity: ['focus-visible', 'hover'],
    },
  },
  plugins: [],
}
