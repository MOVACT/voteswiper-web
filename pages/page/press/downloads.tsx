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
        title={t('press:downloads')}
        canonical={url(`/page/press/downloads`, true)}
      />
      <PageHeader
        title={t('press:downloads')}
        breadcrumb={[
          {
            item: `/page/press`,
            name: t('press:title'),
          },
          {
            item: '/page/presse/downloads',
            name: t('press:downloads'),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="flex flex-col space-y-4 md:space-x-6 md:flex-row">
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
            </div>
          </PressPage>
        </Container>
      </Page>
    </>
  );
};

export default Press;
