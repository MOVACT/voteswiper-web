const config = {
  url: process.env.NEXT_PUBLIC_API_URL,
  version: 1,

  languageNames: {
    'de-ch': 'Deutsch',
    de: 'Deutsch',
    en: 'English',
    it: 'Italiano',
    fr: 'Français',
    fi: 'Suomi',
    sv: 'Svenska',
    fa: 'فارسی',
    ar: 'عربى',
    tr: 'Türkçe',
    ku: 'Kurdî',
    ru: 'русский язык',
  } as { [key: string]: string },

  // A workaround because next.js can't translate non dynamic routes yet, so we're just gonna make them dynamic
  translatedSlugs: {
    parties: {
      'de-ch': 'parteien',
      de: 'parteien',
      en: 'parties',
      fr: 'partis',
      fi: 'puolueet',
      sv: 'partier',
      ru: 'partii',
      tr: 'partiler',
      fa: 'parties',
      ku: 'parties',
      ar: 'parties',
      it: 'parti',
    } as { [key: string]: string },
  },
};

export default config;
