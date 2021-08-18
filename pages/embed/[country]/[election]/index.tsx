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
import { fetchTranslatedStory } from 'connectors/storyblok';
import { ElectionProvider, useElection } from 'contexts/election';
import { isPast } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
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
import createFromDateTime from 'util/createFromDatetime';
import formatLocal from 'util/formatLocal';
import storyblokDimensions from 'util/storyblokDimensions';
import url from 'util/url';

type ElectionStory = null | StoryblokStory<{
  component: 'electionPage';
  name: string;
  links: Array<{
    text: string;
    link: StoryblokLink;
    _uid: string;
  }>;
  partner: Array<{
    component: 'partner';
    _uid: string;
    link: StoryblokLink;
    name: string;
    logo: StoryblokAsset;
  }>;
}>;

interface Props {
  country: Country;
  election: Election;
  parties: Party[];
  questions: Question[];
  story: ElectionStory;
}

interface ContentProps {
  story: ElectionStory;
}

const PrivacyLink: React.FC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Link href={t('footer:privacyLink')} passHref>
      <a className="font-normal text-underline">{children}</a>
    </Link>
  );
};

const CountryPageContent: React.FC<ContentProps> = ({ story }) => {
  const { election, screen, startSwiper, endSwiper, country } = useElection();
  const { slug: countrySlug } = country;
  const { name, slug } = election;
  const { t } = useTranslation();
  const { locale } = useRouter();

  const translationString = (): string => {
    const isElectionPast = isPast(createFromDateTime(election.voting_day));
    if (election.parties_not_participating === 0) {
      if (isElectionPast) {
        return 'election:introTextAllPast';
      } else {
        return 'election:introTextAllFuture';
      }
    }

    if (isElectionPast) {
      return 'election:introTextPast';
    }

    return 'election:introTextFuture';
  };

  React.useEffect(() => {
    const container = document.getElementById('swiper-container');
    if (screen === STEPS.SWIPER) {
      document.getElementById('footer')?.classList.add('hidden');
      if (container) {
        container.style.minHeight = '657px';
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
          {screen === STEPS.START && (
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
                      {election.playable ? (
                        <Trans
                          i18nKey={translationString()}
                          values={{
                            name: name,
                            date: formatLocal(
                              createFromDateTime(election.voting_day),
                              'PPP',
                              locale
                            ),
                            participating: election.parties_participating,
                            total:
                              election.parties_not_participating +
                              election.parties_participating,
                          }}
                          components={[<strong key="" />]}
                        />
                      ) : (
                        <>
                          <p>
                            <Trans
                              i18nKey={'election:introVotingDay'}
                              values={{
                                name: name,
                                date: formatLocal(
                                  createFromDateTime(election.voting_day),
                                  'PPP',
                                  locale
                                ),
                                playableDate: formatLocal(
                                  createFromDateTime(election.playable_date),
                                  'PPP',
                                  locale
                                ),
                              }}
                              components={[<strong key="" />, <br key="" />]}
                            />
                          </p>
                        </>
                      )}
                    </p>

                    <p>
                      <Button
                        color="primary"
                        size="lg"
                        className="w-full md:w-auto"
                        disabled={!election.playable}
                        onClick={() => {
                          if (!election.playable) return;
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

                  {story !== null && story.content.partner.length > 0 && (
                    <>
                      <h2 className="mb-2 text-2xl font-medium leading-tight text-white md:text-3xl md:mb-4 lg:mb-6">
                        {t('election:partner')}
                      </h2>

                      <div className="flex flex-wrap -mx-2 md:-mx-3 lg:-mx-4">
                        {story.content.partner.map((partner) => {
                          return (
                            <React.Fragment key={partner._uid}>
                              {partner.link.url !== '' ? (
                                <a
                                  href={partner.link.url}
                                  target="_blank"
                                  className="block w-1/2 px-2 md:w-40 lg:w-52 md:px-3 lg:px-4"
                                  rel="noopener noreferrer nofollow"
                                  title={partner.name}
                                >
                                  <Image
                                    src={partner.logo.filename}
                                    alt={partner.logo.alt}
                                    {...storyblokDimensions(
                                      partner.logo.filename
                                    )}
                                    layout="responsive"
                                    objectFit="contain"
                                    objectPosition="center"
                                  />
                                </a>
                              ) : (
                                <div className="w-1/2 px-2 md:w-32 lg:w-40 md:px-3 lg:px-4">
                                  <Image
                                    src={partner.logo.filename}
                                    alt={partner.logo.alt}
                                    layout="responsive"
                                    {...storyblokDimensions(
                                      partner.logo.filename
                                    )}
                                    objectFit="contain"
                                    objectPosition="center"
                                  />
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </>
                  )}
                </Container>
              </Page>
            </motion.div>
          )}

          {screen === STEPS.SWIPER && (
            <Swiper
              key="swiper"
              onRequestClose={() => {
                endSwiper();
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

      <ExplainerScreen />
    </>
  );
};

const CountryPage: NextPage<Props> = ({
  country,
  election,
  questions,
  parties,
  story,
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
        height: windowHeight,
      },
      '*'
    );

    requestRef.current = requestAnimationFrame(resizeFrame);
  }, []);

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
      <CountryPageContent story={story} />
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

  const story = await fetchTranslatedStory({
    locale,
    paths: [params?.country, params?.election],
  });

  if (country.data === null || election.data === null)
    return { notFound: true };

  const parties = await fetch<Party, PartiesData>(ENDPOINTS.PARTIES, locale, {
    data: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      slug: params!.election as string,
    },
  });

  const props = {
    election: election.data,
    questions: questions.data,
    country: country.data,
    parties: parties.data,
    story,
  };

  return {
    props,
    revalidate: 500,
  };
};

export default CountryPage;
