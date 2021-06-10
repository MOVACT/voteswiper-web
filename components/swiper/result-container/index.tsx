import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { useElection } from 'contexts/election';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { STEPS } from '../constants';
import ResultMenu from '../result-menu';

const ResultContainer: React.FC = ({ children }) => {
  const { country, election, screen } = useElection();
  const { t } = useTranslation();

  const title = React.useMemo(() => {
    if (screen === STEPS.EDIT_ANSWERS) {
      return t('election:changeAnswers');
    } else if (screen === STEPS.COMPARE_PARTY) {
      return t('election:compareParty');
    }

    return t('election:yourResult');
  }, [screen, t]);

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
        title={title}
      />
      <Page>
        <Container>
          <ResultMenu />
          {children}
        </Container>
      </Page>
    </>
  );
};

export default ResultContainer;
