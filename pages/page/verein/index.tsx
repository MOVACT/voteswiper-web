import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import SidebarMenu from 'components/sidebar-menu';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import url from 'util/url';

export const VereinPage: React.FC = ({ children }) => {
  const menu = [
    {
      href: '/page/verein',
      title: 'org:org',
    },
    {
      href: '/page/verein/mitglied-werden',
      title: 'org:becomeSupporter',
    },
    {
      href: '/page/verein/satzung',
      title: 'org:statutes',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarMenu items={menu} className="mb-10 lg:pr-10 lg:w-1/3 xl:w-1/4" />
      <div className="w-full lg:w-2/3 xl:w-3/4">{children}</div>
    </div>
  );
};

const Verein: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('org:org')} canonical={url(`/page/verein`, true)} />
      <PageHeader
        title={t('org:org')}
        breadcrumb={[
          {
            item: `/page/verein`,
            name: t('org:org'),
          },
        ]}
      />
      <Page>
        <Container>
          <VereinPage>
            <div className="prose prose-white">
              <p>Allgemeiner Text zum Verein...</p>
            </div>
          </VereinPage>
        </Container>
      </Page>
    </>
  );
};

export default Verein;
