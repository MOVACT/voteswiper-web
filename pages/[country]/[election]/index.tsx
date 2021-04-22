import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Page from 'components/page';
import Container from 'components/layout/container';
import PageHeader from 'components/page-header';
import apiFetch, { QUERIES } from 'api/fetch';
import {
  ApiGetCountries,
  ApiGetCountry,
  ApiGetElection,
  ApiGetElections,
  Country,
  Election,
} from 'types/api';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import url from 'util/url';

interface Props {
  country: Country;
  election: Election;
}

const CountryPage: NextPage<Props> = ({ country, election }) => {
  const { name: countryName, slug: countrySlug } = country;
  const { name, slug } = election;
  const { locale } = useRouter();
  const { t } = useTranslation('country');

  return (
    <>
      <NextSeo
        title={name}
        canonical={url(`/${countrySlug}/${slug}`, locale !== 'de')}
      />
      <PageHeader
        breadcrumb={[
          {
            item: `/${countrySlug}`,
            name: countryName,
          },
          {
            item: `/${countrySlug}/${slug}`,
            name: name,
          },
        ]}
        title={name}
      />
      <Page>
        <Container>hallo</Container>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{
  country: string;
  election: string;
}> = async ({ locales }) => {
  const paths: Array<
    string | { params: { country: string; election: string }; locale?: string }
  > = [];
  if (locales) {
    for (const locale of locales) {
      const countries = await apiFetch<ApiGetCountries>(
        QUERIES.GET_COUNTRIES,
        {},
        locale
      );

      await Promise.all(
        countries.data.data.countries.map(async (country) => {
          const electionsForCountry = await apiFetch<ApiGetElections>(
            QUERIES.GET_ELECTIONS,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            { country: country.slug },
            locale
          );

          electionsForCountry.data.data.elections.map((election) => {
            paths.push({
              params: {
                country: country.slug,
                election: election.slug,
              },
              locale,
            });
          });

          electionsForCountry.data.data.pastElections.map((election) => {
            paths.push({
              params: {
                country: country.slug,
                election: election.slug,
              },
              locale,
            });
          });
        })
      );
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const election = await apiFetch<ApiGetElection>(
    QUERIES.GET_ELECTION,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { slug: params!.election as string },
    locale
  );

  const country = await apiFetch<ApiGetCountry>(
    QUERIES.GET_COUNTRY,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { slug: params!.country as string },
    locale
  );

  if (
    country.data.data.country === null ||
    election.data.data.election === null
  )
    return { notFound: true };

  const props = {
    election: election.data.data.election,
    country: country.data.data.country,
  };

  return {
    props,
  };
};

export default CountryPage;
