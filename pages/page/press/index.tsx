import cn from 'classnames';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import PressContact from 'content-components/press-contact';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
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
      title: 'press:releases',
      href: '/page/press/releases',
    },
    {
      title: 'press:downloads',
      href: '/page/press/downloads',
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
                  router.pathname === menuItem.href ||
                    (router.pathname.indexOf(menuItem.href) > -1 &&
                      menuItem.href === '/page/press/releases')
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
      <NextSeo title={t('press:title')} canonical={url(`/page/press`, true)} />
      <PageHeader
        title={t('press:title')}
        breadcrumb={[
          {
            item: `/page/press`,
            name: t('press:title'),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="prose prose-white">
              <Trans i18nKey="press:intro" components={[<p key="" />]} />

              <PressContact />
            </div>
          </PressPage>
        </Container>
      </Page>
    </>
  );
};

export default Press;
