module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './pages/**/*.ts',
      './pages/**/*.tsx',
      './pages/**/*.jsx',
      './components/**/*.tsx',
      './components/**/*.jsx',
      './components/**/*.js'
    ]
  },
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
      },
      typography: {
        DEFAULT: {
          css: {
            strong: {
              fontWeight: '500',
            },
          },
        },
        'white': {
          css: {
            color: '#fff',
            strong: {
              color: '#fff',
            }
          }
        }
      },
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
