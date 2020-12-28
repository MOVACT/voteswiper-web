import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import url from 'util/url';
import Header from './header';

const Layout: React.FC = ({ children }) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <NextSeo
        openGraph={{
          site_name: t('name'),
          locale: lang,
          type: 'website',
        }}
        titleTemplate={t('titleTemplate')}
        description={t('metaDefaultDescription')}
        additionalMetaTags={[
          {
            name: 'apple-mobile-web-app-title',
            content: t('name'),
          },
          {
            name: 'application-name',
            content: t('name'),
          },
          {
            name: 'msapplication-TileColor',
            content: '##8186d7',
          },
          {
            name: 'msapplication-config',
            content: url('/images/meta/browserconfig.xml'),
          },
          {
            name: 'theme-color',
            content: '#ffffff',
          },
          {
            name: 'apple-itunes-app',
            content: 'app-id=1231104532',
          },
          {
            name: 'google-play-app',
            content: 'app-id=com.wahlswiper',
          },
          {
            name: 'twitter:app:id:iphone',
            content: '1231104532',
          },
          {
            name: 'twitter:app:id:googleplay',
            content: 'com.wahlswiper',
          },
          {
            name: 'twitter:app:name:googleplay',
            content: t('name'),
          },
          {
            name: 'al:ios:app_store_id',
            content: '1231104532',
          },
          {
            name: 'al:ios:app_name',
            content: t('name'),
          },
          {
            name: 'al:android:package',
            content: 'com.wahlswiper',
          },
          {
            name: 'al:android:app_name',
            content: t('name'),
          },
          {
            name: 'fb:admins',
            content: '1507340523',
          },
        ]}
        twitter={{
          handle: t('twitterHandle'),
          site: t('twitterHandle'),
        }}
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;
