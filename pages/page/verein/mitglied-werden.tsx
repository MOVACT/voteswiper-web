import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import url from 'util/url';
import { VereinPage } from '.';

const Verein: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={t('org:becomeSupporter')}
        canonical={url(`/page/verein/mitglied-werden`, true)}
      />
      <PageHeader
        title={t('org:becomeSupporter')}
        breadcrumb={[
          {
            item: `/page/verein`,
            name: t('org:org'),
          },
          {
            item: `/page/verein/mitglied-werden`,
            name: t('org:becomeSupporter'),
          },
        ]}
      />
      <Page>
        <Container>
          <VereinPage>
            <div className="py-8 bg-white rounded">
              <iframe
                title="Aufnahme-Formular"
                src="https://easyverein.com/public/VoteSwiper/applicationform?iframe=True"
                className="min-h-[850px] w-full border-0"
              />
            </div>
          </VereinPage>
        </Container>
      </Page>
    </>
  );
};

export default Verein;
