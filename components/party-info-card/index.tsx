import Button from 'components/button';
import HyperlinkIcon from 'icons/hyperlink.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import { Party } from 'types/api';

interface Props {
  party: Party;
}

const PartyInfoCard: React.FC<Props> = ({ party }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full p-6 rounded-lg bg-gradient-to-b from-white to-brand-light-blue focus-default">
      <div className="flex items-center">
        <div className="w-1/4 ">
          <div className="relative h-[40px]">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              alt={party.full_name}
              sizes="(min-width: 1024px) 100px, 150px"
              src={party.logo.public_link}
            />
          </div>
        </div>
        <div className="w-3/4 pl-4 text-lg font-medium leading-6 text-brand-dark-blue">
          {party.full_name}
        </div>
      </div>

      {(party.url || party.pivot.program || party.pivot.program_link) && (
        <div className="mt-2 mt-auto">
          {party.url && (
            <Button
              href={party.url}
              target="_blank"
              rel="nofollow noreferrer noopener"
              color="outlineDark"
              className="flex items-center justify-between w-full mt-2"
            >
              {t('election:website')}
              <HyperlinkIcon className="w-4 h-4 ml-2" />
            </Button>
          )}

          {party.pivot.program !== null ? (
            <div className="mt-3">
              <Button
                href={party.pivot.program.public_link}
                target="_blank"
                rel="nofollow noreferrer noopener"
                color="outlineDark"
                className="flex items-center justify-between w-full mt-2"
              >
                {t('election:program')}
                <HyperlinkIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <>
              {party.pivot.program_link && (
                <div className="mt-3">
                  <Button
                    href={party.pivot.program_link}
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    color="outlineDark"
                    className="flex items-center justify-between w-full mt-2"
                  >
                    {t('election:program')}
                    <HyperlinkIcon className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PartyInfoCard;
