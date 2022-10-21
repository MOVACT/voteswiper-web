import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Swiper from 'components/swiper';
import { STEPS } from 'components/swiper/constants';
import ResultContainer from 'components/swiper/result-container';
import ComparePartyScreen from 'components/swiper/screen-compare-party';
import EditAnswersScreen from 'components/swiper/screen-edit-answers';
import EditPartiesScreen from 'components/swiper/screen-edit-parties';
import ExplainerScreen from 'components/swiper/screen-explainer';
import PartiesScreen from 'components/swiper/screen-parties';
import ResultScreen from 'components/swiper/screen-result';
import { ENDPOINTS, fetch } from 'connectors/api';
import { ElectionProvider, useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Country,
  CountryData,
  Election,
  ElectionBySlugData,
  PartiesData,
  Party,
  Question,
  QuestionsData,
} from 'types/api';
import url from 'util/url';

interface Props {
  country: Country;
  election: Election;
  parties: Party[];
  questions: Question[];
}

const CountryPageContent: React.FC = () => {
  const { election, screen, startSwiper, endSwiper, country } = useElection();
  const { name: countryName, slug: countrySlug } = country;
  const { name, slug } = election;
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <NextSeo
        title={name}
        noindex
        canonical={url(`/${countrySlug}/${slug}`, locale !== 'en')}
      />
      <div className="min-h-screen">
        <AnimatePresence exitBeforeEnter>
          {screen === STEPS.START && (
            <motion.div
              key="start"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                      <Button
                        color="primary"
                        size="lg"
                        className="w-full md:w-auto"
                        onClick={() => {
                          startSwiper();
                        }}
                      >
                        {t('election:start')}
                      </Button>
                    </p>
                  </div>
                </Container>
              </Page>
            </motion.div>
          )}

          {screen === STEPS.SWIPER && (
            <Swiper
              key="swiper"
              onRequestClose={() => {
                if (window.confirm(t('election:quit'))) {
                  endSwiper();
                }
              }}
            />
          )}
        </AnimatePresence>

        {screen === STEPS.PARTIES && <PartiesScreen />}

        {[
          STEPS.RESULT,
          STEPS.EDIT_ANSWERS,
          STEPS.EDIT_PARTIES,
          STEPS.COMPARE_PARTY,
        ].indexOf(screen) > -1 && (
          <ResultContainer>
            {screen === STEPS.RESULT && <ResultScreen />}
            {screen === STEPS.EDIT_ANSWERS && <EditAnswersScreen />}
            {screen === STEPS.EDIT_PARTIES && <EditPartiesScreen />}
            {screen === STEPS.COMPARE_PARTY && <ComparePartyScreen />}
          </ResultContainer>
        )}

        <ExplainerScreen />
      </div>
    </>
  );
};

const ElectionPreviewPage: NextPage<Props> = ({
  country,
  election,
  questions,
  parties,
}) => {
  return (
    <ElectionProvider
      country={country}
      parties={parties}
      questions={questions}
      election={election}
    >
      <CountryPageContent />
    </ElectionProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const election = await fetch<Election, ElectionBySlugData>(
    ENDPOINTS.ELECTION,
    locale,
    {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        slug: params!.election as string,
      },
      headers: {
        'API-Preview-Key': process.env.API_PREVIEW_KEY,
      },
    }
  );

  let questions = null;
  try {
    questions = await fetch<Question, QuestionsData>(
      ENDPOINTS.QUESTIONS,
      locale,
      {
        data: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          slug: params!.election as string,
        },
        headers: {
          'API-Preview-Key': process.env.API_PREVIEW_KEY,
        },
      }
    );
  } catch {
    questions = {
      data: [],
    };
  }

  const country = await fetch<Country, CountryData>(ENDPOINTS.COUNTRY, locale, {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slug: params!.country as string,
    },
  });

  if (country.data === null || election.data === null)
    return { notFound: true };

  const parties = await fetch<Party, PartiesData>(ENDPOINTS.PARTIES, locale, {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slug: params!.election as string,
    },
    headers: {
      'API-Preview-Key': process.env.API_PREVIEW_KEY,
    },
  });

  const props = {
    election: election.data,
    questions: questions.data,
    country: country.data,
    parties: parties.data,
  };

  return {
    props,
  };
};

export default ElectionPreviewPage;
