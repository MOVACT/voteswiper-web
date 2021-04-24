import apiFetch, { QUERIES } from 'api/fetch';
import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Swiper from 'components/swiper';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { useLockBodyScroll } from 'react-use';
import {
  ApiGetCountries,
  ApiGetCountry,
  ApiGetElection,
  ApiGetElections,
  ApiGetQuestions,
  Country,
  Election,
} from 'types/api';
import url from 'util/url';

interface Props {
  country: Country;
  election: Election;
}

const CountryPage: NextPage<Props> = ({ country, election }) => {
  const [running, setRunning] = React.useState(false);
  const { name: countryName, slug: countrySlug } = country;
  const { name, slug } = election;
  const { locale } = useRouter();

  useLockBodyScroll(running);

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
        <Container>
          <div className="mb-24 prose prose-white lg:prose-xl">
            <p>
              Die Bundestagswahl findet am <strong>26. September 2020</strong>{' '}
              statt. Es treten 32 Parteien an.{' '}
              <strong>26&nbsp;von&nbsp;32 Parteien</strong> haben ihre Antworten
              beim WahlSwiper übermittelt.
            </p>

            <p>
              <Button
                color="primary"
                size="lg"
                className="w-full md:w-auto"
                onClick={() => setRunning(true)}
              >
                WahlSwiper starten
              </Button>
            </p>
          </div>

          <h2 className="mt-12 text-3xl font-medium text-white">
            Weitere Informationen
          </h2>

          <h2 className="mt-12 text-3xl font-medium text-white">Partner</h2>
        </Container>
      </Page>

      <Swiper open={running} />
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

  const questions = await apiFetch<ApiGetQuestions>(
    QUERIES.GET_QUESTIONS,
    { slug: params?.election as string },
    locale
  );

  console.log(questions.data);

  const country = await apiFetch<ApiGetCountry>(
    QUERIES.GET_COUNTRY,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    { slug: params!.country as string },
    locale
  );

  if (
    country.data.data.country === null ||
    election.data.data.election === null ||
    questions.data.data.questions === null
  )
    return { notFound: true };

  const props = {
    election: election.data.data.election,
    questions: questions.data.data.questions,
    country: country.data.data.country,
  };

  return {
    props,
    revalidate: 500,
  };
};

export default CountryPage;
