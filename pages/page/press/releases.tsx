import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import url from 'util/url';
import { PressPage } from '.';

const Press: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={t('press:releases')}
        canonical={url(`/page/press/releases`, true)}
      />
      <PageHeader
        title={t('press:releases')}
        breadcrumb={[
          {
            item: `/page/press`,
            name: t('press:title'),
          },
          {
            item: '/page/presse/releases',
            name: t('press:releases'),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="prose prose-white">Under Construction</div>
          </PressPage>
        </Container>
      </Page>
    </>
  );
};

export default Press;
