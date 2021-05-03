import apiFetch, { QUERIES } from 'api/fetch';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import PartyInfoCard from 'components/party-info-card';
import config from 'config';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import {
  ApiGetCountries,
  ApiGetCountry,
  ApiGetElection,
  ApiGetElections,
  Country,
  Election,
  Party,
} from 'types/api';
import url from 'util/url';

interface Props {
  country: Country;
  election: Election;
}

const CountryPage: NextPage<Props> = ({ country, election }) => {
  const { name: countryName, slug: countrySlug } = country;
  const { name, slug } = election;
  const { t } = useTranslation();
  const { locale } = useRouter();

  const allParties = [
    ...election.parties,
    ...election.parties_not_participating,
  ] as Party[];

  return (
    <>
      <NextSeo
        title={`${t('election:parties')} - ${election.name}`}
        canonical={url(
          `/${countrySlug}/${slug}/${
            config.translatedSlugs.parties[(locale as unknown) as string]
          }`,
          locale !== 'de'
        )}
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
          {
            item: `/${countrySlug}/${slug}/${
              config.translatedSlugs.parties[(locale as unknown) as string]
            }`,
            name: t('election:parties'),
          },
        ]}
        title={t('election:parties')}
      />
      <Page>
        <Container>
          <div className="flex flex-wrap md:-mx-2 lg:-mx-4">
            {allParties.map((party) => {
              return (
                <div
                  key={party.id}
                  className="flex w-full my-2 md:m-0 md:p-2 lg:p-4 md:w-1/2 lg:w-1/3"
                >
                  <PartyInfoCard party={party} />
                </div>
              );
            })}
          </div>
        </Container>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{
  country: string;
  election: string;
  parties: string;
}> = async ({ locales }) => {
  const paths: Array<
    | string
    | {
        params: { country: string; election: string; parties: string };
        locale?: string;
      }
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
                parties: config.translatedSlugs.parties[locale],
              },
              locale,
            });
          });

          electionsForCountry.data.data.pastElections.map((election) => {
            paths.push({
              params: {
                country: country.slug,
                election: election.slug,
                parties: config.translatedSlugs.parties[locale],
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
    revalidate: 500,
  };
};

export default CountryPage;
