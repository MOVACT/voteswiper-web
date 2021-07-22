import { init } from '@socialgouv/matomo-next';
import { AppComponent } from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/layout';
import i18n from '../i18n';
import '../styles/app.scss';

const App: AppComponent = ({ Component, pageProps }) => {
  const router = useRouter();

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

  React.useEffect(() => {
    const dir =
      router.locale && i18n.rtlLocales.indexOf(router.locale) > -1
        ? 'rtl'
        : 'ltr';
    const lang = router.locale || 'en';
    document.querySelector('html')?.setAttribute('dir', dir);
    document.querySelector('html')?.setAttribute('lang', lang);
  }, [router]);

  if (router.route === '/share-image') {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
