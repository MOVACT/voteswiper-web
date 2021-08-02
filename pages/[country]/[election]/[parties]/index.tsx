import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import PartyInfoCard from 'components/party-info-card';
import config from 'config';
import { ENDPOINTS, fetch } from 'connectors/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Country,
  CountryData,
  Election,
  ElectionBySlugData,
  ElectionsData,
  PartiesData,
  Party,
} from 'types/api';
import url from 'util/url';

interface Props {
  country: Country;
  election: Election;
  parties: Party[];
}

const CountryPage: NextPage<Props> = ({ country, election, parties }) => {
  const { name: countryName, slug: countrySlug } = country;
  const { name, slug } = election;
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <NextSeo
        title={`${t('election:parties')} - ${election.name}`}
        canonical={url(
          `/${countrySlug}/${slug}/${
            config.translatedSlugs.parties[(locale as unknown) as string]
          }`,
          locale !== 'en'
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
            {parties.map((party) => {
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
      const countries = await fetch<CountryData[]>(ENDPOINTS.COUNTRIES, locale);

      await Promise.all(
        countries.data.map(async (country) => {
          const electionsForCountry = await fetch<Election[], ElectionsData>(
            ENDPOINTS.ELECTIONS,
            locale,
            {
              data: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                country: country.slug as string,
              },
            }
          );

          electionsForCountry.data.map((election) => {
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
  const election = await fetch<Election, ElectionBySlugData>(
    ENDPOINTS.ELECTION,
    locale,
    {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slug: params!.election as string,
      },
    }
  );

  const country = await fetch<Country, CountryData>(ENDPOINTS.COUNTRY, locale, {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slug: params!.country as string,
    },
  });

  if (!country.data || !election.data) return { notFound: true };

  const parties = await fetch<Party, PartiesData>(ENDPOINTS.PARTIES, locale, {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slug: params!.election as string,
    },
  });

  const props = {
    election: election.data,
    country: country.data,
    parties: parties.data,
  };

  return {
    props,
    revalidate: 500,
  };
};

export default CountryPage;
