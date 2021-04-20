import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from './election-card.module.css';
import asset from 'util/asset';
import { Country, Election } from 'types/api';
import { useRouter } from 'next/router';
import formatLocal from 'util/formatLocal';
import useTranslation from 'next-translate/useTranslation';

interface Props extends Election {
  country: Country;
}

const ElectionCard: React.FC<Props> = ({
  slug,
  card,
  name,
  country,
  active,
  active_date,
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
          width={1600}
          height={900}
          layout="responsive"
          alt={name}
          src={asset(card)}
        />
      </div>
      <div className="px-5 py-4 leading-tight">
        <div className="pt-1 text-brand-primary">
          {t(active ? 'common:votingDay' : 'common:availableFrom', {
            date: formatLocal(
              new Date(active ? voting_day : active_date),
              'PPP',
              locale
            ),
          })}
        </div>
        <div className="text-lg font-medium lg:text-xl text-brand-primary">
          {name}
        </div>
      </div>
    </>
  );

  if (!active) {
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
