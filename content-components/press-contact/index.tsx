import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';

const PressContact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('press:contact')}</h2>

      <div className="flex items-center">
        <div className="w-24 mie-4">
          <Image
            src="/images/matthias-bannert.jpg"
            layout="responsive"
            sizes="96px"
            className="rounded-full"
            alt="Matthias Bannert"
            width={400}
            height={400}
          />
        </div>
        <div>
          Matthias Bannert
          <br />
          Telefon: +49 (0)30 4036669 43
          <br />
          {t('press:email')}{' '}
          <a
            className="text-underline focus-default"
            href="mailto:press@voteswiper.org"
          >
            press@voteswiper.org
          </a>
        </div>
      </div>
    </>
  );
};

export default PressContact;
