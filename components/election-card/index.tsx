import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './election-card.module.css';
import asset from 'util/asset';
import { Country, Election } from 'types/api';

interface Props extends Election {
  country: Country;
}

const ElectionCard: React.FC<Props> = ({ slug, card, name, country }) => {
  return (
    <Link href={`/${country.slug}/${slug}`} passHref>
      <a className="bg-gradient-to-b from-white to-brand-light-blue rounded-lg shadow-xl focus-default">
        <div className={styles.image}>
          <Image
            width={1600}
            height={900}
            layout="responsive"
            alt={name}
            src={asset(card)}
          />
        </div>
        <div className="p-5">{name}</div>
      </a>
    </Link>
  );
};

export default ElectionCard;
