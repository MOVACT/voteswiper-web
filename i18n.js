module.exports = {
  //"locales": ['de', 'en', 'sv', 'fr', 'fi'],
  "locales": ['de', 'en'],
  "defaultLocale": "de",
  "pages": {
    "*": ["common", "header", "footer"],
    "/[country]": ["country"],
    "/404": ["error"],
  }
};
