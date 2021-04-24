import apiFetch, { QUERIES } from 'api/fetch';
import ElectionCard from 'components/election-card';
import ElectionGrid from 'components/election-grid';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import {
  ApiGetCountries,
  ApiGetCountry,
  ApiGetElections,
  Country,
  Election,
} from 'types/api';
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
              <h2 className="pb-4 text-2xl font-medium leading-tight text-white md:text-3xl md:pb-6 lg:pb-8">
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

  console.log(paths);
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
    revalidate: 500,
  };
};

export default CountryPage;
