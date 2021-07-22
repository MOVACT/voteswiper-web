import cn from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Country, Election } from 'types/api';
import createFromDateTime from 'util/createFromDatetime';
import formatLocal from 'util/formatLocal';
import styles from './election-card.module.css';

interface Props extends Election {
  country: Country;
}

const ElectionCard: React.FC<Props> = ({
  slug,
  card,
  name,
  country,
  playable,
  playable_date,
  voting_day,
}) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const cardClassName =
    'bg-gradient-to-b from-white to-brand-light-blue rounded-lg focus-default';

  const content = (
    <>
      <div className={styles.image}>
        <Image
          width={card.width}
          height={card.height}
          sizes="(min-width: 1025px) 424px, (min-width: 770px) 470px, 100vw"
          layout="responsive"
          alt={name}
          src={card.public_link}
        />
      </div>
      <div className="px-5 py-4 leading-tight">
        <div className="pt-1 text-brand-primary">
          {t(playable ? 'common:votingDay' : 'common:availableFrom', {
            date: formatLocal(
              createFromDateTime(playable ? voting_day : playable_date),
              'PPP',
              locale
            ),
          })}
        </div>
        <div className="pt-1 text-lg font-medium leading-5 text-brand-dark-blue">
          {name}
        </div>
      </div>
    </>
  );

  if (!playable) {
    return (
      <div className={cn(cardClassName, 'opacity-50 shadow-xl')}>{content}</div>
    );
  }

  return (
    <Link href={`/${country.slug}/${slug}`} passHref>
      <a className={cn(cardClassName, 'shadow-xl hover:shadow-lg')}>
        {content}
      </a>
    </Link>
  );
};

export default ElectionCard;
