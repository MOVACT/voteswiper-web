import cn from 'classnames';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import url from 'util/url';

export const PressPage: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const menu = [
    {
      title: 'press:contact',
      href: '/page/press',
    },
    {
      title: 'press:downloads',
      href: '/page/press/downloads',
    },
    {
      title: 'press:releases',
      href: '/page/press/releases',
    },
    {
      title: 'press:embed',
      href: '/page/press/embed',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col mb-10 space-y-2 lg:pr-10 lg:w-1/3 xl:w-1/4">
        {menu.map((menuItem) => {
          return (
            <Link key={menuItem.href} href={menuItem.href} passHref>
              <a
                className={cn(
                  'block bg-white rounded-lg px-4 py-3 leading-0 font-medium text-white focus-default',
                  router.pathname === menuItem.href
                    ? 'bg-opacity-20'
                    : 'bg-opacity-0 hover:bg-opacity-10'
                )}
              >
                {t(menuItem.title)}
              </a>
            </Link>
          );
        })}
      </div>
      <div className="w-full lg:w-2/3 xl:w-3/4">{children}</div>
    </div>
  );
};

const Press: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('press:title')} canonical={url(`/page/presse`, true)} />
      <PageHeader
        title={t('press:title')}
        breadcrumb={[
          {
            item: `/page/presse`,
            name: t('press:title'),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="prose prose-white">
              <Trans i18nKey="press:intro" components={[<p key="" />]} />

              <h2>{t('press:contact')}</h2>

              <div className="flex items-center space-x-8">
                <div className="w-24">
                  <Image
                    src="/images/matthias-bannert.jpg"
                    layout="responsive"
                    sizes="96px"
                    className="rounded-full"
                    alt="Matthias Bannert"
                    width={400}
                    height={400}
                  />
                </div>
                <div>
                  Matthias Bannert
                  <br />
                  Telefon: +49 (0)30 4036669 43
                  <br />
                  {t('press:email')}{' '}
                  <a
                    className="text-underline focus-default"
                    href="mailto:presse@voteswiper.org"
                  >
                    press@voteswiper.org
                  </a>
                </div>
              </div>
            </div>
          </PressPage>

          {/*<h2 className="pb-4 text-2xl font-medium leading-tight text-white md:text-3xl md:pb-6 lg:pb-8">
            Downloads
          </h2>

          <div className="flex flex-col space-x-6 md:flex-row">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <a
                href="/downloads/wahlswiper_logos.zip"
                title="Logo als ZIP"
                download
                className="block rounded-lg bg-gradient-to-b from-white to-brand-light-blue focus-default"
              >
                <div className="px-5 py-4 leading-tight">
                  <div className="pt-1 text-lg font-medium leading-4 text-brand-dark-blue">
                    Logos
                  </div>
                  <div className="pt-1 text-brand-primary">3.3 MB</div>
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <a
                href="/downloads/wahlswiper_screenshots.zip"
                title="Screenshots als ZIP"
                download
                className="block rounded-lg bg-gradient-to-b from-white to-brand-light-blue focus-default"
              >
                <div className="px-5 py-4 leading-tight">
                  <div className="pt-1 text-lg font-medium leading-4 text-brand-dark-blue">
                    App-Screenshots
                  </div>
                  <div className="pt-1 text-brand-primary">5.3 MB</div>
                </div>
              </a>
            </div>
          </div>*/}
        </Container>
      </Page>
    </>
  );
};

export default Press;
