import { ENDPOINTS, fetch } from 'api/fetch';
import { fetchTranslatedStory } from 'api/storyblok';
import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Swiper from 'components/swiper';
import { STEPS } from 'components/swiper/constants';
import config from 'config';
import { ElectionProvider, useElection } from 'contexts/election';
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
  ElectionsData,
  Question,
  QuestionsData,
} from 'types/api2';
import formatLocal from 'util/formatLocal';
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
  questions: Question[];
  story: ElectionStory;
}

interface ContentProps {
  country: Country;
  story: ElectionStory;
}

const CountryPageContent: React.FC<ContentProps> = ({ story, country }) => {
  const { election, screen, startSwiper, endSwiper } = useElection();
  const { name: countryName, slug: countrySlug } = country;
  const { name, slug } = election;
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <NextSeo
        title={name}
        canonical={url(`/${countrySlug}/${slug}`, locale !== 'de')}
      />
      {(screen === STEPS.START || screen === STEPS.SWIPER) && (
        <>
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
                  <Trans
                    i18nKey="election:introText"
                    values={{
                      name: name,
                      date: formatLocal(
                        new Date(election.voting_day),
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
                </p>

                <p>
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={() => startSwiper()}
                  >
                    {t('election:start')}
                  </Button>
                </p>
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
                  <h2 className="mb-2 text-2xl font-medium leading-tight text-white md:text-3xl md:mb-4 lg:mb-6">
                    {t('election:partner')}
                  </h2>

                  <div className="flex flex-wrap">
                    {story.content.partner.map((partner) => {
                      return (
                        <div
                          key={partner._uid}
                          className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                        >
                          <div className="relative min-h-[125px]">
                            {partner.link.url !== '' ? (
                              <a
                                href={partner.link.url}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                title={partner.name}
                              >
                                <Image
                                  src={partner.logo.filename}
                                  alt={partner.logo.alt}
                                  className="w-auto h-10"
                                  layout="fill"
                                  objectFit="contain"
                                  objectPosition="center"
                                />
                              </a>
                            ) : (
                              <Image
                                src={partner.logo.filename}
                                alt={partner.logo.alt}
                                className="w-auto h-10"
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </Container>
          </Page>
        </>
      )}

      <Swiper
        open={screen === STEPS.SWIPER}
        onRequestClose={() => {
          if (window.confirm(t('election:quit'))) {
            endSwiper();
          }
        }}
      />
    </>
  );
};

const CountryPage: NextPage<Props> = ({
  country,
  election,
  questions,
  story,
}) => {
  return (
    <ElectionProvider
      questions={
        process.env.NODE_ENV === 'development'
          ? questions.slice(0, 4)
          : questions
      }
      election={election}
    >
      <CountryPageContent story={story} country={country} />
    </ElectionProvider>
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
      const countries = await fetch<Country[]>(ENDPOINTS.COUNTRIES, locale);

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

  const questions = await fetch<Question, QuestionsData>(
    ENDPOINTS.QUESTIONS,
    locale,
    {
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        election: params!.election as string,
      },
    }
  );

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

  const props = {
    election: election.data,
    questions: questions.data,
    country: country.data,
    story,
  };

  return {
    props,
    revalidate: 500,
  };
};

export default CountryPage;
