import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import SidebarMenu from 'components/sidebar-menu';
import PressContact from 'content-components/press-contact';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import url from 'util/url';

export const PressPage: React.FC = ({ children }) => {
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
      <SidebarMenu items={menu} className="mb-10 lg:pr-10 lg:w-1/3 xl:w-1/4" />
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
