const config = {
  url: process.env.NEXT_PUBLIC_API_URL,
  version: 1,

  languageNames: {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    fi: 'Suomi',
    sv: 'Svenska',
  } as { [key: string]: string },
};

export default config;
