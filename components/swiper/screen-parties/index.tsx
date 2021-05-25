import cn from 'classnames';
import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { useElection } from 'contexts/election';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';

const PartiesScreen: React.FC = () => {
  const {
    country,
    election,
    parties,
    selectedParties,
    toggleParty,
  } = useElection();
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
          <div className="max-w-4xl">
            <div className="grid grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-3">
              {parties.map((party) => {
                return (
                  <button
                    key={party.id}
                    onClick={() => {
                      toggleParty(party.id);
                    }}
                    className={cn(
                      'block w-full bg-white rounded shadow-lg focus-default bg-gradient-to-b from-white to-[#d9daeb] hover:from-[#d9daeb] pt-3 pb-2 lg:pb-4 px-2 lg:px-4 hover:shadow-sm',
                      selectedParties.indexOf(party.id) > -1
                        ? 'ring-4 ring-brand-highlight'
                        : 'lg:hover:ring-4 lg:hover:ring-brand-dark-blue'
                    )}
                  >
                    <div className="relative h-12 lg:h-16">
                      <Image
                        src={party.logo.public_link}
                        layout="fill"
                        objectFit="contain"
                        sizes="280px"
                        objectPosition="center"
                        alt={party.full_name}
                      />
                    </div>
                    <div className="mt-4 text-xs font-medium text-center bg-white rounded-sm text-brand-dark-blue lg:text-base">
                      {party.name}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="fixed bottom-0 left-0 z-50 w-screen px-4 pt-3 pb-5 lg:mt-10 lg:relative lg:w-auto lg:p-0 lg:bg-transparent lg:flex lg:justify-end bg-brand-dark-blue bg-opacity-90">
              <Button
                color="primary"
                size="blank"
                className="w-full py-2.5 px-4 lg:px-10 lg:py-4 text-base lg:w-auto lg:text-lg rounded-xl"
                disabled={selectedParties.length === 0}
              >
                {t('election:goToResult')}
              </Button>
            </div>
          </div>
        </Container>
      </Page>
    </>
  );
};

export default PartiesScreen;
