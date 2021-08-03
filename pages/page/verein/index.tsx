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
              <p>
                Der Verein VoteSwiper wurde gegründet, um{' '}
                <strong>Demokratie und politische Bildung</strong> zu{' '}
                <strong>fördern</strong>, insbesondere durch die Herausgabe der
                beliebten Wahlhilfe-Anwendung WahlSwiper bzw. VoteSwiper.
              </p>
              <p>
                Der WahlSwiper wurde erstmals 2017 zur Bundestagswahl
                veröffentlicht und von Max Mitschke, Steven Siebert und Matthias
                Bannert erfunden, die zusammen das Kreativstudio für Code und
                Content{' '}
                <a
                  href="https://www.movact.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MOVACT
                </a>{' '}
                betreiben. Inzwischen wird der WahlSwiper in Kooperation mit
                Prof. Uwe Wagschal und der Universität Freiburg entwickelt.
              </p>

              <p>
                Seit der Europawahl 2019 gibt es die App auch als VoteSwiper in
                anderen Ländern und zur Bundestagswahl 2021 in den Sprachen
                Englisch, Türkisch, Russisch, Arabisch und Persisch.
              </p>

              <p>
                Der WahlSwiper war und ist{' '}
                <strong>gänzlich unkommerziell</strong>. Zur Sicherung der
                Finanzierung mit Spenden und langfristigen Weiterentwicklung des
                Bildungsprojektes wurde 2021 der gemeinnützige Verein VoteSwiper
                gegründet, dem die langjährigen Teammitglieder Matthias Bannert,
                Prof. Uwe Wagschal und Steven Siebert vorstehen.
              </p>

              <p>
                Der Verein wird durch Fördermitgliedschaften und Spenden
                vorangetrieben und das Projekt WahlSwiper ist auf entsprechende
                Unterstützung angewiesen.
              </p>
            </div>
          </VereinPage>
        </Container>
      </Page>
    </>
  );
};

export default Verein;
