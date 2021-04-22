import axios, { AxiosPromise } from 'axios';
import config from './config';

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

const queries = {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_UPCOMING_ELECTIONS,
  GET_ELECTIONS,
  GET_ELECTION,
};

export enum QUERIES {
  GET_COUNTRIES = 'GET_COUNTRIES',
  GET_COUNTRY = 'GET_COUNTRY',
  GET_UPCOMING_ELECTIONS = 'GET_UPCOMING_ELECTIONS',
  GET_ELECTIONS = 'GET_ELECTIONS',
  GET_ELECTION = 'GET_ELECTION',
}

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

export default apiFetch;
