import cn from 'classnames';
import Button from 'components/button';
import { useElection } from 'contexts/election';
import IconCheckmark from 'icons/checkmark.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import { STEPS } from '../constants';

const PartiesForm: React.FC = () => {
  const {
    parties,
    selectedParties,
    toggleParty,
    toggleAllParties,
    goToScreen,
  } = useElection();
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl">
      <div className="pb-6">
        <button
          onClick={toggleAllParties}
          className="flex items-center font-medium text-white rounded lg:text-lg focus-default"
        >
          <div className="flex items-center justify-center w-5 h-5 mr-2 border border-white rounded-sm lg:mr-4 lg:w-6 lg:h-6">
            {parties.length === selectedParties.length && (
              <IconCheckmark className="w-5 h-5 lg:w-6 lg:h-6" />
            )}
          </div>
          {parties.length === selectedParties.length
            ? t('election:selectedAllParties')
            : t('election:selectAllParties')}
        </button>
      </div>
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
          onClick={() => {
            goToScreen(STEPS.RESULT);
          }}
          disabled={selectedParties.length === 0}
        >
          {t('election:goToResult')}
        </Button>
      </div>
    </div>
  );
};

export default PartiesForm;
