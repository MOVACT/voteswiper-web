module.exports = {
  locales: ['de', 'en', 'sv', 'fr', 'fi', 'tr', 'ru', 'ar', 'fa'],
  defaultLocale: 'en',
  rtlLocales: ['ar', 'fa'],
  pages: {
    '*': ['common', 'header', 'footer'],
    '/': ['home'],
    '/[country]': ['country'],
    '/404': ['error'],
    '/[country]/[election]': ['election'],
    '/embed/[country]/[election]': ['election'],
    '/[country]/[election]/[parties]': ['election'],
    '/page/press': ['press'],
    '/page/press/embed': ['press'],
    '/page/press/downloads': ['press'],
    '/page/press/releases': ['press'],
    '/page/[page]': ['page'],
  },
};
