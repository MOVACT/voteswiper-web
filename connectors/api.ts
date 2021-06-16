import axios, { AxiosPromise } from 'axios';
import config from '../config';

const GET_COUNTRIES = `
  query Countries($locale: String!) {
    countries(locale: $locale) {
      id
      name
      slug
      country_code
      language_code
      elections_count
    }
  }
`;

const GET_COUNTRY = `
  query Countries($locale: String!, $slug: String!) {
    country: countryBySlug(locale: $locale, slug: $slug) {
      id
      name
      slug
      country_code
      language_code
      elections_count
    }
  }
`;

const GET_UPCOMING_ELECTIONS = `
query Elections($locale: String!, $country: Int!) {
  elections(locale: $locale, country: $country) {
    id
    name
    slug
    card
    voting_day
    partner_logo
    partner_name
    partner_text
    voting_day
    active
    active_date
    parties {
      id
      election_id
      name
      slug
      full_name
      logo
      pivot {
        id
        program
        program_pdf
        answers {
          id
          question_id
          answer
          reason
        }
      }
    }
  }
}
`;

const GET_ELECTIONS = `
query Elections($locale: String!, $country: String!) {
  elections: electionsByCountrySlug(locale: $locale, country: $country) {
    id
    name
    slug
    card
    voting_day
    partner_logo
    partner_name
    partner_text
    voting_day
    active
    active_date
    parties {
      id
      election_id
      name
      slug
      full_name
      logo
      pivot {
        id
        program
        program_pdf
        answers {
          id
          question_id
          answer
          reason
        }
      }
    }
  }
  pastElections: electionsByCountrySlug(locale: $locale, country: $country, past: true) {
    id
    name
    slug
    card
    voting_day
    partner_logo
    partner_name
    partner_text
    voting_day
    active
    active_date
    parties {
      id
      election_id
      name
      slug
      full_name
      logo
      pivot {
        id
        program
        program_pdf
        answers {
          id
          question_id
          answer
          reason
        }
      }
    }
  }
}
`;

const GET_ELECTION = `
  query Election($locale: String!, $slug: String!) {
    election: electionBySlug(locale: $locale, slug: $slug) {
      id
      name
      slug
      card
      voting_day
      partner_logo
      partner_name
      partner_text
      voting_day
      active
      active_date
      parties_not_participating {
        id
        name
        full_name
        logo
        pivot {
          id
          program
          program_pdf
        }
      }
      parties {
        id
        election_id
        name
        slug
        full_name
        logo
        pivot {
          id
          program
          program_pdf
          answers {
            id
            question_id
            answer
            reason
          }
        }
      }
    }
  }
`;

const GET_QUESTIONS = `
query Questions($locale: String!, $slug: String!) {
  questions: questionsByElectionSlug(locale: $locale, slug: $slug) {
    id
    question
    title
    video_url
    thumbnail
    explainer_text
  }
}
`;

const queries = {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_UPCOMING_ELECTIONS,
  GET_ELECTIONS,
  GET_ELECTION,
  GET_QUESTIONS,
};

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
  }
): AxiosPromise<T> => {
  return axios({
    method: options ? options.method ?? 'post' : 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    data: options?.data,
    headers: {
      'Content-Type': 'application/json',
      'Content-Language': locale,
      Accept: `application/x.voteswiper.v${process.env.NEXT_PUBLIC_API_VERSION}+json`,
    },
  });
};

const apiFetch = <T>(
  query: QUERIES,
  variables: { [key: string]: string | number },
  locale?: string,
  method: 'post' | 'get' | 'put' | 'delete' = 'post'
): AxiosPromise<T> => {
  const data = {
    query: queries[query],
    variables: {
      ...variables,
      locale: locale,
    },
  };

  return axios({
    method,
    url: config.url,
    data,
    headers: {
      'Content-Type': 'application/json',
      'Content-Language': locale,
    },
  });
};

export { fetch };
export default apiFetch;
