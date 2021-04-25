module.exports = {
  //"locales": ['de', 'en', 'sv', 'fr', 'fi'],
  locales: ['de', 'en', 'sv', 'fr', 'fi'],
  defaultLocale: 'de',
  pages: {
    '*': ['common', 'header', 'footer'],
    '/': ['home'],
    '/[country]': ['country'],
    '/404': ['error'],
  },
};
