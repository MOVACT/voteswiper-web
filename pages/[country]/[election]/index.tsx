import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import PaypalDonationForm from 'components/paypal-donation-form';
import Swiper from 'components/swiper';
import { STEPS } from 'components/swiper/constants';
import ResultContainer from 'components/swiper/result-container';
import ComparePartyScreen from 'components/swiper/screen-compare-party';
import EditAnswersScreen from 'components/swiper/screen-edit-answers';
import EditPartiesScreen from 'components/swiper/screen-edit-parties';
import ExplainerScreen from 'components/swiper/screen-explainer';
import PartiesScreen from 'components/swiper/screen-parties';
import ResultScreen from 'components/swiper/screen-result';
import config from 'config';
import { ENDPOINTS, fetch } from 'connectors/api';
import { fetchTranslatedStory } from 'connectors/storyblok';
import { ElectionProvider, useElection } from 'contexts/election';
import { isPast } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import HyperlinkIcon from 'icons/hyperlink.svg';
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
  const { name: countryName, slug: countrySlug } = country;
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

  return (
    <>
      <NextSeo
        title={name}
        openGraph={{
          images: [
            {
              url: election.card.public_link,
              width: election.card.width,
              height: election.card.height,
              alt: election.name,
            },
          ],
        }}
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
                          startSwiper(() => confirm(t('election:savedState')));
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

                  <h2 className="mb-2 text-2xl font-medium leading-tight text-brand-highlight md:text-3xl md:mb-4">
                    {t('election:donationTitle')}
                  </h2>

                  <div className="mb-24 prose prose-white lg:prose-xl">
                    <Trans
                      i18nKey="election:donationText"
                      components={[<p key="p" />, <strong key="s" />]}
                    />

                    <div className="mt-2">
                      <PaypalDonationForm />
                    </div>

                    {locale === 'de' && (
                      <p>
                        <small>
                          Weitere Zahlungsmöglichkeiten findest du auf unserer{' '}
                          <Link href="/page/verein/spenden" passHref>
                            <a>Spendenseite</a>
                          </Link>
                          .
                        </small>
                      </p>
                    )}
                  </div>

                  {story !== null && (
                    <>
                      {story.content.links.length > 0 && (
                        <>
                          <h2 className="mb-2 text-2xl font-medium leading-tight text-white md:text-3xl md:mb-4">
                            {t('election:moreInformation')}
                          </h2>

                          <ul className="flex flex-wrap mb-4 -mx-1 -mx-2 md:mb-6 lg:mb-12">
                            <li className="w-full p-1 md:p-2 md:w-1/2 lg:w-1/3">
                              <Link
                                href={`/${country.slug}/${election.slug}/${
                                  config.translatedSlugs.parties[
                                    (locale as unknown) as string
                                  ]
                                }`}
                                passHref
                              >
                                <a className="block text-lg text-white hover:text-brand-highlight bg-white hover:underline bg-opacity-[0.05] rounded px-4 py-2 hover:bg-opacity-10 focus-default">
                                  {t('election:parties')}
                                </a>
                              </Link>
                            </li>

                            {story.content.links.map((link) => {
                              return (
                                <li
                                  className="w-full p-1 md:p-2 md:w-1/2 lg:w-1/3"
                                  key={link._uid}
                                >
                                  <a
                                    className="block text-lg text-white bg-white hover:text-brand-highlight hover:underline bg-opacity-[0.05] rounded px-4 py-2 hover:bg-opacity-10 focus-default flex items-center justify-between"
                                    href={link.link.url}
                                    key={link._uid}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                  >
                                    {link.text}
                                    <HyperlinkIcon className="w-4 h-4 ml-2" />
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}
                    </>
                  )}

                  {story !== null && story.content.partner.length > 0 && (
                    <>
                      <h2 className="mb-3 text-2xl font-medium leading-tight text-white md:text-3xl md:mb-4 lg:mb-6">
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

                  {locale === 'de' && election.slug === 'bundestagswahl-2021' && (
                    <div className="mt-10">
                      <h2 className="mb-3 text-2xl font-medium leading-tight text-white md:text-3xl md:mb-4 lg:mb-6">
                        Unsere Partnerschaft mit #wAlman
                      </h2>

                      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
                        <div className="pt-6 prose lg:prose-lg lg:w-2/3 lg:pr-10 prose-white lg:pt-0">
                          <p>
                            Wer die Wahl hat, hat die Macht. Denn wählen zu
                            können, bedeutet mitzubestimmen. Bisher aber
                            beteiligen sich zu wenige Menschen mit Flucht- und
                            Migrationshintergrund an Wahlen in Deutschland.
                            Dafür gibt es verschiedene Gründe: Die formalen
                            Hürden sind zu hoch, das Prozedere erscheint sehr
                            kompliziert und es fehlt eine gezielte Ansprache der
                            Parteien. Das wollen wir ändern! Die Neuen Deutschen
                            sollen ermutigt werden, im September 2021 ihre
                            Stimme bei der Bundestagswahl abzugeben – und so
                            mitzuentscheiden, wie sich dieses Land in den
                            nächsten Jahren entwickeln wird. Dafür stellen wir
                            Informationen und digitale Tools zur Verfügung und
                            erklären, warum es wichtig ist, bei der Wahl
                            mitzumachen und zum #wAlman zu werden:{' '}
                            <a
                              href="https://ichbinwalman.de"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              ichbinwalman.de
                            </a>
                            . Eine Kampagne der VielRespektStiftung.
                          </p>
                        </div>
                        <div className="lg:w-1/3">
                          <Image
                            src="/images/wAlman.jpg"
                            layout="responsive"
                            width={1001}
                            height={1001}
                            alt="walman-Kampagne"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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

const CountryPage: NextPage<Props> = ({
  country,
  election,
  questions,
  parties,
  story,
}) => {
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
