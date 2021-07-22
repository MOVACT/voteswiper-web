module.exports = {
  locales: ['de', 'en', 'sv', 'fr', 'fi'],
  defaultLocale: 'en',
  rtlLocales: ['ar', 'fa'],
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
