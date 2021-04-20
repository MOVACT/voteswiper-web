import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const NotFound: NextPage = () => {
  const { t } = useTranslation('error');
  return (
    <>
      <NextSeo title={t('error:notFoundTitle')} />
      <div className="flex items-center justify-center min-h-[85vh] px-6 pt-32 pb-12">
        <h1 className="text-xl font-medium text-white">
          {t('error:notFoundTitle')}
        </h1>
      </div>
    </>
  );
};

export default NotFound;
