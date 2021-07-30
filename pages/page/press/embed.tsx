import { Listbox, RadioGroup, Transition } from '@headlessui/react';
import { IconChevronDown } from '@tabler/icons';
import cn from 'classnames';
import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import config from 'config';
import { ENDPOINTS, fetch } from 'connectors/api';
import IconCheckmark from 'icons/checkmark.svg';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { CountryData, Election, ElectionsData } from 'types/api';
import url from 'util/url';
import { PressPage } from '.';

interface Props {
  elections: { [key: string]: { election: Election; country: CountryData }[] };
}

const Press: NextPage<Props> = ({ elections }) => {
  const { t } = useTranslation();
  const { locale, locales } = useRouter();

  const [selectedElection, setElection] = React.useState<string>('');
  const [selectedLocale, setLocale] = React.useState<string>(locale || 'de');
  const [generated, setGenerated] = React.useState<boolean>(false);

  const translatedCountrySlug = React.useMemo(() => {
    if (selectedElection) {
      const election = elections[selectedLocale].find(
        (e) => e.election.id === parseInt(selectedElection)
      );

      if (election) return election.country.slug;
    }

    return '';
  }, [selectedElection, elections, selectedLocale]);

  const translatedElectionsSlug = React.useMemo(() => {
    if (selectedElection) {
      const election = elections[selectedLocale].find(
        (e) => e.election.id === parseInt(selectedElection)
      );

      if (election) return election.election.slug;
    }

    return '';
  }, [selectedElection, elections, selectedLocale]);

  return (
    <>
      <NextSeo
        title={t('press:embed')}
        canonical={url(`/page/presse/embed`, true)}
      />
      <PageHeader
        title={t('press:embed')}
        breadcrumb={[
          {
            item: `/page/presse`,
            name: t('press:title'),
          },
          {
            item: '/page/presse/embed',
            name: t('press:embed'),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="prose prose-white">
              <Trans
                i18nKey="press:embedIntro"
                components={[
                  <p key="" />,
                  <strong key="s" className="underline" />,
                ]}
              />

              <div className="px-4 py-3 text-sm text-black rounded-lg bg-brand-highlight">
                <Trans
                  i18nKey="press:embedNotice"
                  components={[
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a
                      href="mailto:press@voteswiper.org"
                      className="text-black underline"
                      key=""
                    />,
                    <span className="text-black underline" key="" />,
                  ]}
                />
              </div>

              {generated ? (
                <>
                  <h2>{t('press:yourEmbedCode')}</h2>

                  <h3>{t('press:iFrameVersion')}</h3>

                  <textarea
                    rows={8}
                    spellCheck={false}
                    className="w-full p-4 border-0 rounded-lg focus-default text-brand-primary"
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    value={`<script type="application/javascript">function receiveMessage(e){var t,n,i=0;if("embed-size"===e.data.type)for(n=(t=document.querySelectorAll(".wahlswiper-embed-frame")).length;i<n;i++)if((t[i].contentWindow||t[i].documentWindow)==e.source)return void(t[i].style.height=e.data.height+"px")}window.addEventListener?window.addEventListener("message",receiveMessage,!1):window.attachEvent&&window.attachEvent("onmessage",receiveMessage);</script><iframe src="https://www.voteswiper.org/${selectedLocale}/embed/${translatedCountrySlug}/${translatedElectionsSlug}" frameborder="0" width="100%" class="wahlswiper-embed-frame"></iframe>`}
                  />

                  <h3>{t('press:ampVersion')}</h3>

                  <textarea
                    rows={5}
                    spellCheck={false}
                    className="w-full p-4 border-0 rounded-lg focus-default text-brand-primary"
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    value={`<amp-iframe width="300" height=300 layout="responsive" sandbox="allow-scripts allow-same-origin" resizable src="https://www.voteswiper.org/${selectedLocale}/embed/${translatedCountrySlug}/${translatedElectionsSlug}"><div overflow tabindex=0 role=button aria-label="WahlSwiper ausfahren">WahlSwiper ausfahren</div></amp-iframe>`}
                  />

                  <Button
                    onClick={() => {
                      setGenerated(false);
                    }}
                    className="mt-10"
                    disabled={!selectedLocale || !selectedElection}
                  >
                    {t('press:backToForm')}
                  </Button>
                </>
              ) : (
                <>
                  <h2>{t('press:generateEmbedCode')}</h2>

                  {elections[locale || 'de'].length === 0 ? (
                    <p>{t('press:noEmbedsAvailable')}</p>
                  ) : (
                    <>
                      <h3>{t('press:pickElection')}</h3>

                      <RadioGroup
                        value={selectedElection}
                        onChange={setElection}
                      >
                        <RadioGroup.Label hidden>
                          {t('press:election')}
                        </RadioGroup.Label>
                        {elections[locale || 'de'].map((election) => {
                          return (
                            <RadioGroup.Option
                              value={election.election.id}
                              key={election.election.id}
                              className={({ active, checked }) =>
                                cn(
                                  'flex items-center rounded-lg my-2 bg-white text-white px-4 py-3 cursor-pointer',
                                  checked ? 'bg-opacity-10' : 'bg-opacity-0',
                                  active && 'focus-default'
                                )
                              }
                            >
                              {({ checked }) => {
                                return (
                                  <>
                                    <div className="flex items-center justify-center w-6 h-6 mr-3 border border-white rounded-full">
                                      {checked && (
                                        <IconCheckmark className="h-4" />
                                      )}
                                    </div>
                                    {election.election.name}
                                  </>
                                );
                              }}
                            </RadioGroup.Option>
                          );
                        })}
                      </RadioGroup>

                      <h3>{t('press:pickLanguage')}</h3>

                      <p>{t('press:languageHelper')}</p>

                      <Listbox value={selectedLocale} onChange={setLocale}>
                        <Listbox.Label hidden>
                          {t('press:language')}
                        </Listbox.Label>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default bg-opacity-10 focus-default">
                            <span className="block truncate">
                              {config.languageNames[selectedLocale]}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <IconChevronDown
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-50 w-full p-3 mt-1 overflow-auto text-base list-none bg-white rounded-lg shadow-lg max-h-60 focus:outline-none sm:text-sm">
                              {(locales || []).map((loc) => {
                                return (
                                  <Listbox.Option
                                    value={loc}
                                    key={loc}
                                    className={({ active, selected }) =>
                                      cn(
                                        'cursor-default select-none relative py-2 px-2 list-none',
                                        active
                                          ? 'text-black bg-brand-primary bg-opacity-10'
                                          : 'text-brand-primary',
                                        selected &&
                                          'bg-brand-primary bg-opacity-10 rounded text-black'
                                      )
                                    }
                                  >
                                    <div className="block truncate">
                                      {config.languageNames[loc]}
                                    </div>
                                  </Listbox.Option>
                                );
                              })}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>

                      <Button
                        onClick={() => {
                          setGenerated(true);
                        }}
                        className="mt-10"
                        disabled={!selectedLocale || !selectedElection}
                      >
                        {t('press:generateCodeCta')}
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </PressPage>
        </Container>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locales }) => {
  const allElections: {
    [key: string]: { election: Election; country: CountryData }[];
  } = {};

  locales?.map((locale) => {
    allElections[locale] = [];
  });

  await Promise.all(
    (locales || []).map(async (locale) => {
      const countries = await fetch<CountryData[]>(ENDPOINTS.COUNTRIES, locale);

      await Promise.all(
        countries.data.map(async (country) => {
          const upcomingElections = await fetch<Election[], ElectionsData>(
            ENDPOINTS.ELECTIONS,
            locale,
            {
              data: {
                country: country.slug,
                include: 'upcoming',
              },
            }
          );

          upcomingElections.data.map((election) =>
            allElections[locale].push({
              election: {
                slug: election.slug,
                name: election.name,
                id: election.id,
              } as Election,
              country,
            })
          );
        })
      );
    })
  );

  return {
    props: {
      elections: allElections,
    },
    revalidate: 300,
  };
};

export default Press;
