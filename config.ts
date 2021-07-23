const config = {
  url: process.env.NEXT_PUBLIC_API_URL,
  version: 1,

  languageNames: {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    fi: 'Suomi',
    sv: 'Svenska',
    fa: 'فارسی',
    ar: 'عربى',
    tr: 'Türkçe',
    ru: 'русский язык',
  } as { [key: string]: string },

  // A workaround because next.js can't translate non dynamic routes yet, so we're just gonna make them dynamic
  translatedSlugs: {
    parties: {
      de: 'parteien',
      en: 'parties',
      fr: 'partis',
      fi: 'puolueet',
      sv: 'partier',
      ru: 'partii',
      tr: 'partiler',
      fa: 'parties',
      ar: 'parties',
    } as { [key: string]: string },
  },
};

export default config;
