import Button from 'components/client-embed/button';
import Container from 'components/client-embed/layout/container';
import Page from 'components/client-embed/page';
import PageHeader from 'components/client-embed/page-header';
import Swiper from 'components/client-embed/swiper';
import { STEPS } from 'components/client-embed/swiper/constants';
import ResultContainer from 'components/client-embed/swiper/result-container';
import ComparePartyScreen from 'components/client-embed/swiper/screen-compare-party';
import EditAnswersScreen from 'components/client-embed/swiper/screen-edit-answers';
import EditPartiesScreen from 'components/client-embed/swiper/screen-edit-parties';
import ExplainerScreen from 'components/client-embed/swiper/screen-explainer';
import PartiesScreen from 'components/client-embed/swiper/screen-parties';
import ResultScreen from 'components/client-embed/swiper/screen-result';
import useClientEmbedBackground from 'components/client-embed/use-client-embed-background';
import { ENDPOINTS, fetch } from 'connectors/api';
import { ElectionProvider, useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import KlzLogo from 'icons/klz_logo_rechteck.svg';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
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

const PrivacyLink: React.FC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Link href={t('footer:privacyLink')} passHref>
      <a className="font-normal text-underline">{children}</a>
    </Link>
  );
};

const CountryPageContent: React.FC = () => {
  const { election, screen, startSwiper, country } = useElection();
  const { slug: countrySlug } = country;
  const { name, slug } = election;
  const { t } = useTranslation();
  const { locale } = useRouter();

  React.useEffect(() => {
    const container = document.getElementById('swiper-container');
    if (screen === STEPS.SWIPER) {
      document.getElementById('footer')?.classList.add('hidden');
      if (container) {
        container.style.minHeight = '670px';
      }
    } else {
      document.getElementById('footer')?.classList.remove('hidden');
      if (container) {
        container.style.minHeight = 'auto';
      }
    }
  }, [screen]);

  return (
    <>
      <NextSeo
        title={name}
        canonical={url(`/${countrySlug}/${slug}`, locale !== 'en')}
        noindex
      />
      <div id="swiper-container">
        <AnimatePresence exitBeforeEnter>
          {screen !== STEPS.RESULT &&
            screen !== STEPS.EDIT_PARTIES &&
            screen !== STEPS.COMPARE_PARTY &&
            screen !== STEPS.PARTIES &&
            screen !== STEPS.EXPLAINER &&
            screen !== STEPS.SWIPER &&
            screen !== STEPS.EDIT_ANSWERS && (
              <motion.div
                key="start"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PageHeader title={name} />
                <Page>
                  <Container>
                    <div className="mb-24 prose prose-white lg:prose-xl">
                      <p>
                        Die Gemeinderatswahl in der Stadt Graz findet am 28.
                        Juni 2026 statt. Elf Parteien treten an. Doch welche
                        passt zur eigenen Meinung? Der WahlSwiper von der
                        Kleinen Zeitung und dem Verein VoteSwiper,
                        wissenschaftlich begleitet durch Kathrin
                        Stainer-Hämmerle (FH Kärnten), gibt Orientierung.
                      </p>
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
                      {election.playable && (
                        <p className="text-sm text-white opacity-70">
                          <Trans
                            i18nKey="election:privacyNote"
                            components={[<PrivacyLink key="pl" />]}
                          />
                        </p>
                      )}
                    </div>

                    <h2 className="mb-2 text-2xl font-medium leading-tight text-white md:text-3xl md:mb-4 lg:mb-6">
                      {t('election:partner')}
                    </h2>

                    <div className="flex flex-wrap -mx-2 md:-mx-3 lg:-mx-4">
                      <a
                        href="https://www.kleinezeitung.at"
                        target="_blank"
                        className="block w-1/2 px-2 md:w-40 lg:w-52 md:px-3 lg:px-4"
                        rel="noopener noreferrer nofollow"
                        title="Kleine Zeitung"
                      >
                        <KlzLogo className="w-full h-auto" />
                      </a>
                    </div>
                  </Container>
                </Page>
              </motion.div>
            )}

          {screen === STEPS.SWIPER && (
            <Swiper
              key="swiper"
              onRequestClose={() => {
                window.location.reload();
                //endSwiper();
              }}
            />
          )}
        </AnimatePresence>
      </div>

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

      <ExplainerScreen inline />
    </>
  );
};

const CountryPage: NextPage<Props> = ({
  country,
  election,
  questions,
  parties,
}) => {
  const $windowHeight = React.useRef<number>(0);
  const requestRef = React.useRef<number>(0);

  const resizeFrame = React.useCallback(() => {
    const $htmlEl = document.getElementsByTagName('html')[0];

    const windowHeight = document.body
      ? Math.max(document.body.offsetHeight, $htmlEl.offsetHeight)
      : $htmlEl.offsetHeight;

    if ($windowHeight.current === windowHeight) {
      requestRef.current = requestAnimationFrame(resizeFrame);
      return false;
    }

    $windowHeight.current = windowHeight;

    window.parent.postMessage(
      {
        sentinel: 'amp',
        type: 'embed-size',
        height: windowHeight === 0 ? 670 : windowHeight,
      },
      '*'
    );

    requestRef.current = requestAnimationFrame(resizeFrame);
  }, []);

  useClientEmbedBackground();

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(resizeFrame);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export const getStaticPaths: GetStaticPaths<{
  country: string;
  election: string;
}> = async () => {
  return {
    paths: [],
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
    revalidate: 86400,
  };
};

export default CountryPage;
