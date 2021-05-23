import { init } from '@socialgouv/matomo-next';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import Layout from '../components/layout';
import '../styles/app.scss';

const App: AppComponent = ({ Component, pageProps }) => {
  React.useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_MATOMO_URL &&
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    ) {
      init({
        url: process.env.NEXT_PUBLIC_MATOMO_URL,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
      });
    }
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
