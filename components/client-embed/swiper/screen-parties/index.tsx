import Container from 'components/client-embed/layout/container';
import Page from 'components/client-embed/page';
import PageHeader from 'components/client-embed/page-header';
import { useElection } from 'contexts/election';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import PartiesForm from './form';

const PartiesScreen: React.FC = () => {
  const { country, election } = useElection();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        breadcrumb={[
          {
            item: `/${country.slug}`,
            name: country.name,
          },
          {
            item: `/${country.slug}/${election.slug}`,
            name: election.name,
          },
        ]}
        title={t('election:selectParties')}
      />
      <Page>
        <Container>
          <div className="mb-4 prose lg:mb-10 prose-white lg:prose-xl">
            <p>
              <Trans
                i18nKey="election:selectPartiesIntro"
                components={[<strong key="" />, <em key="" />]}
              />
            </p>
          </div>
          <PartiesForm />
        </Container>
      </Page>
    </>
  );
};

export default PartiesScreen;
