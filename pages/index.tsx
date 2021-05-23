import { ENDPOINTS, fetch } from 'api/fetch';
import cn from 'classnames';
import CountryFlag from 'components/country-flag';
import Container from 'components/layout/container';
import i18n from 'i18n';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Country } from 'types/api2';
import url from 'util/url';
import MapGermany from './germany.svg';
import styles from './home.module.scss';

interface Props {
  countries: Country[];
}

const Home: NextPage<Props> = ({ countries }) => {
  const { t } = useTranslation('home');

  return (
    <div className="relative w-screen overflow-hidden">
      <NextSeo
        title={t('pageTitle')}
        languageAlternates={(() => {
          const alternates: { hrefLang: string; href: string }[] = [];

          i18n.locales.map((loc) => {
            alternates.push({
              hrefLang: loc,
              href: url(`/${loc}`),
            });
          });

          return alternates;
        })()}
      />
      <Container className="flex items-center pt-24 pb-24 lg:min-h-screen lg:pt-48">
        <div className="w-full text-base text-white md:text-lg lg:text-xl lg:w-1/2">
          <h1 className="text-4xl font-bold text-white lg:text-6xl">
            {t('title')}
          </h1>

          <p className="my-4">{t('intro')}</p>

          <p className="my-4 font-medium">{t('pickCountry')}</p>

          <div className={styles.countryPicker}>
            {countries.map((country) => {
              return (
                <div
                  className="w-full pb-3 lg:pr-3 lg:w-1/2 xl:w-1/3"
                  key={country.id}
                >
                  <Link href={`/${country.slug}`} passHref>
                    <a className="flex flex-col items-center w-full px-4 pt-4 pb-2 text-base font-medium rounded-lg shadow-lg hover:shadow-sm bg-gradient-to-b from-white to-brand-light-blue hover:to-[#dee3f3] lg:py-3 lg:pl-3 lg:pr-4 lg:flex-row text-brand-dark-blue focus-default">
                      <div className="px-3 pt-1 pb-3 lg:pt-0 lg:px-0 lg:pb-0">
                        <CountryFlag
                          countryCode={country.country_code}
                          className="w-full h-auto rounded lg:rounded-sm lg:w-8 lg:mr-3"
                        />
                      </div>
                      {country.name}
                    </a>
                  </Link>
                </div>
              );
            })}

            <div className="w-4 lg:hidden" />
          </div>
        </div>
      </Container>
      <MapGermany
        className={cn(
          'object-fit object-right absolute hidden lg:block',
          styles.visual
        )}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const countries = await fetch<Country[]>(ENDPOINTS.COUNTRIES, locale);

  return {
    props: {
      countries: countries.data,
    },
  };
};

export default Home;
