import ElectionCard from 'components/election-card';
import ElectionGrid from 'components/election-grid';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { ENDPOINTS, fetch } from 'connectors/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { Country, CountryData, Election, ElectionsData } from 'types/api';
import url from 'util/url';

interface Props {
  country: Country;
  upcomingElections: Election[];
  pastElections: Election[];
}

const CountryPage: NextPage<Props> = ({
  country,
  upcomingElections,
  pastElections,
}) => {
  const { name, slug } = country;
  const { locale } = useRouter();
  const { t } = useTranslation('country');

  return (
    <>
      <NextSeo
        title={t('title', { country: name })}
        canonical={url(`/${slug}`, locale !== 'en')}
      />
      <PageHeader
        breadcrumb={[
          {
            item: `/${slug}`,
            name,
          },
        ]}
        title={t('title', { country: name })}
      />
      <Page>
        <Container>
          {upcomingElections.length > 0 && (
            <>
              <h2 className="pb-4 text-2xl font-medium leading-tight text-white md:text-3xl md:pb-6 lg:pb-8">
                {t('currentElections')}
              </h2>
              <ElectionGrid>
                {upcomingElections.map((election) => {
                  return (
                    <ElectionCard
                      key={election.id}
                      {...election}
                      country={country}
                    />
                  );
                })}
              </ElectionGrid>
            </>
          )}

          {pastElections.length > 0 && (
            <div
              className={
                upcomingElections.length > 0 ? 'pt-8 md:pt-10 lg:pt-14' : ''
              }
            >
              <h2 className="pb-4 text-2xl font-medium leading-tight text-white md:text-3xl md:pb-6 lg:pb-8">
                {t('pastElections')}
              </h2>

              <ElectionGrid>
                {pastElections.map((election) => {
                  return (
                    <ElectionCard
                      key={election.id}
                      {...election}
                      country={country}
                    />
                  );
                })}
              </ElectionGrid>
            </div>
          )}
        </Container>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ country: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const country = await fetch<Country, CountryData>(ENDPOINTS.COUNTRY, locale, {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slug: params!.country as string,
    },
  });

  if (country.data === null) return { notFound: true };

  const upcomingElections = await fetch<Election[], ElectionsData>(
    ENDPOINTS.ELECTIONS,
    locale,
    {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        country: params!.country as string,
        include: 'upcoming',
      },
    }
  );

  const pastElections = await fetch<Election[], ElectionsData>(
    ENDPOINTS.ELECTIONS,
    locale,
    {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        country: params!.country as string,
        include: 'past',
      },
    }
  );

  const props = {
    upcomingElections: upcomingElections.data,
    pastElections: pastElections.data,
    country: country.data,
  };

  return {
    props,
    revalidate: 86400,
  };
};

export default CountryPage;
