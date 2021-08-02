module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './pages/**/*.ts',
      './pages/**/*.tsx',
      './pages/**/*.jsx',
      './components/**/*.tsx',
      './components/**/*.jsx',
      './components/**/*.js',
      './content-components/**/*.tsx',
      './content-components/**/*.jsx',
      './content-components/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Rubik"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          primary: '#59568b',
          'light-blue': '#eff3ff',
          'dark-blue': '#392f52',
          pink: '#DB67AE',
          highlight: '#E6E90F',
        },
        "green-vibrant": {
          500: '#00e640',
          600: '#12a73b',
        }
      },
      screens: {
        print: { raw: 'print' },
      },
      boxShadow: {
        xl: '0px 0.7rem 3rem 0px rgba(0,0,0,0.25)',
        right: '2px 0 2px 0 rgba(0,0,0,0.10)'
      },
      typography: {
        DEFAULT: {
          css: {
            strong: {
              fontWeight: '500',
            },
          },
        },
        white: {
          css: {
            color: '#fff',
            strong: {
              color: '#fff',
            },
            ol: {
              li: {
                '&::before': {
                  color: '#fff'
                },
              },
            },
            a: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
          },
        },
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
    logical: ['responsive']
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-logical')],
};
