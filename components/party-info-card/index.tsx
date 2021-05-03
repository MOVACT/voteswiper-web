import Button from 'components/button';
import HyperlinkIcon from 'icons/hyperlink.svg';
import Image from 'next/image';
import React from 'react';
import { Party } from 'types/api';
import asset from 'util/asset';

interface Props {
  party: Party;
}

const PartyInfoCard: React.FC<Props> = ({ party }) => {
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
              sizes="150px, (min-width: 1024px) 200px"
              src={asset(party.logo)}
            />
          </div>
        </div>
        <div className="w-3/4 pl-4 text-lg font-medium leading-6 text-brand-dark-blue">
          {party.full_name}
        </div>
      </div>

      {party.pivot.program && (
        <div className="pt-4 mt-auto">
          <Button
            href={party.pivot.program}
            target="_blank"
            rel="nofollow noreferrer noopener"
            color="outlineDark"
            className="flex items-center justify-between w-full"
          >
            Parteiprogramm
            <HyperlinkIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PartyInfoCard;
