import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import url from 'util/url';
import Footer from './footer';
import Header from './header';
import EmbedHeader from './header/embed-header';

const Layout: React.FC = ({ children }) => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();

  return (
    <>
      <NextSeo
        openGraph={{
          site_name: t('name'),
          locale: lang,
          type: 'website',
          images: [
            {
              url:
                'https://www.voteswiper.org/images/meta/wahlswiper-share-fb.jpeg',
              width: 1200,
              height: 630,
            },
          ],
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
      {router.pathname.indexOf('embed') === -1 ? <Header /> : <EmbedHeader />}
      {children}
      {router.pathname.indexOf('embed') === -1 && <Footer />}
    </>
  );
};

export default Layout;
