import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Page from 'components/page';
import Container from 'components/layout/container';
import PageHeader from 'components/page-header';
import ElectionGrid from 'components/election-grid';
import ElectionCard from 'components/election-card';
import apiFetch, { QUERIES } from 'api/fetch';
import {
  ApiGetCountries,
  ApiGetCountry,
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
  elections: Election[];
  pastElections: Election[];
}

const CountryPage: NextPage<Props> = ({
  country,
  elections,
  pastElections,
}) => {
  const { name, slug } = country;
  const { locale } = useRouter();
  const { t } = useTranslation('country');

  return (
    <>
      <NextSeo
        title={t('title', { country: name })}
        canonical={url(`/${slug}`, locale !== 'de')}
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
          {elections.length > 0 && (
            <>
              <h2 className="text-white font-medium text-2xl md:text-3xl leading-tight pb-4 md:pb-6 lg:pb-8">
                {t('currentElections')}
              </h2>
              <ElectionGrid>
                {elections.map((election) => {
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
              className={elections.length > 0 ? 'pt-8 md:pt-10 lg:pt-14' : ''}
            >
              <h2 className="text-white font-medium text-2xl md:text-3xl leading-tight pb-4 md:pb-6 lg:pb-8">
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

export const getStaticPaths: GetStaticPaths<{ country: string }> = async ({
  locales,
}) => {
  const paths: Array<
    string | { params: { country: string }; locale?: string }
  > = [];
  if (locales) {
    for (const locale of locales) {
      const countries = await apiFetch<ApiGetCountries>(
        QUERIES.GET_COUNTRIES,
        {},
        locale
      );

      countries.data.data.countries.map((country) => {
        paths.push({
          params: {
            country: country.slug,
          },
          locale,
        });
      });
    }
  }
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const electionsForCountry = await apiFetch<ApiGetElections>(
    QUERIES.GET_ELECTIONS,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { country: params!.country as string },
    locale
  );

  const country = await apiFetch<ApiGetCountry>(
    QUERIES.GET_COUNTRY,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { slug: params!.country as string },
    locale
  );

  if (country.data.data.country === null) return { notFound: true };

  const props = {
    ...electionsForCountry.data.data,
    country: country.data.data.country,
  };

  return {
    props,
  };
};

export default CountryPage;
