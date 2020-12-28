import { GetStaticProps, NextPage } from 'next';
import cn from 'classnames';
import apiFetch, { QUERIES } from 'api/fetch';
import Container from 'components/layout/container';
import MapGermany from './germany.svg';
import styles from './home.module.css';
import {
  ApiGetUpcomingElections,
  ApiGetCountries,
  Country,
  Election,
} from 'types/api';

interface Props {
  countries: Country[];
  elections?: Election[];
}

const Home: NextPage<Props> = ({ countries, elections }) => {
  console.log(countries, elections);
  return (
    <div className="relative">
      <Container className="pt-48 pb-48 flex items-center min-h-screen">
        <div className="w-1/2 text-white text-xl">
          <h1 className="text-white font-bold text-6xl">Superwahljahr 2021</h1>

          <p className="my-4">
            In diesem Jahr finden neben der Bundestagswahl auch noch sechs
            Landtagswahlen bzw. Wahlen zum Abgeordnetenhaus statt. Der
            WahlSwiper wird zu allen Wahlen erscheinen.
          </p>
        </div>
      </Container>
      <MapGermany
        className={cn('object-fit object-right absolute', styles.visual)}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const countries = await apiFetch<ApiGetCountries>(
    QUERIES.GET_COUNTRIES,
    {},
    locale
  );

  if (locale === 'de') {
    const germany = countries.data.data.countries.find(
      (c) => c.slug === 'deutschland'
    );

    if (germany) {
      // get elections for germany
      const elections = await apiFetch<ApiGetUpcomingElections>(
        QUERIES.GET_UPCOMING_ELECTIONS,
        {
          country: germany.id,
        },
        locale
      );

      return {
        props: {
          countries: countries.data.data,
          elections: elections.data.data,
        },
      };
    }
  }

  return {
    props: {
      countries: countries.data.data,
    },
  };
};

export default Home;
