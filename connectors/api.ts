import axios, { AxiosPromise } from 'axios';

export enum QUERIES {
  GET_COUNTRIES = 'GET_COUNTRIES',
  GET_COUNTRY = 'GET_COUNTRY',
  GET_UPCOMING_ELECTIONS = 'GET_UPCOMING_ELECTIONS',
  GET_ELECTIONS = 'GET_ELECTIONS',
  GET_ELECTION = 'GET_ELECTION',
  GET_QUESTIONS = 'GET_QUESTIONS',
}

export enum ENDPOINTS {
  COUNTRIES = '/countries',
  ALTERNATE_COUNTRY_SLUGS = '/alternateCountrySlugs',
  COUNTRY = '/countryBySlug',
  ELECTIONS = '/elections',
  ELECTION = '/election',
  QUESTIONS = '/questions',
  PARTIES = '/parties',
  COUNT_ANSWER = '/statistics/countAnswer',
  SAVE_RESULT = '/statistics/saveResult',
  COUNT_INITIATE = '/statistics/initiate',
}

const fetch = <T, D = void>(
  url: ENDPOINTS,
  locale?: string,
  options?: {
    data?: D;
    method?: 'post' | 'get' | 'put' | 'delete';
    headers?: { [key: string]: string | number | undefined };
  }
): AxiosPromise<T> => {
  // Rostock Bürgermeisterwahl Test case
  // We're misusing de-ch locale for getting a slightly changed
  // version of the site referencing candidates instead of parties
  let loc = locale;

  if (locale === 'de-ch') {
    loc = 'de';
  }

  return axios({
    method: options ? options.method ?? 'post' : 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    data: options?.data,
    headers: {
      'Content-Type': 'application/json',
      'Content-Language': loc,
      Accept: `application/x.voteswiper.v${process.env.NEXT_PUBLIC_API_VERSION}+json`,
      ...(options?.headers ?? {}),
    },
  });
};

export { fetch };
