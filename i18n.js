module.exports = {
  //"locales": ['de', 'en', 'sv', 'fr', 'fi'],
  locales: ['de', 'en', 'sv', 'fr'],
  defaultLocale: 'de',
  pages: {
    '*': ['common', 'header', 'footer'],
    '/': ['home'],
    '/[country]': ['country'],
    '/404': ['error'],
    '/[country]/[election]': ['election'],
    '/[country]/[election]/[parties]': ['election'],
    '/page/[page]': ['page'],
  },
};
