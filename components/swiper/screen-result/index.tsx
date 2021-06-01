import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { calculateResult, useElection } from 'contexts/election';
import { motion } from 'framer-motion';
import IconChevronRight from 'icons/chevron-right.svg';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { STEPS } from '../constants';

const ResultScreen: React.FC = () => {
  const {
    country,
    election,
    questions,
    answers,
    parties,
    saveResult,
    goToScreen,
  } = useElection();
  const { t } = useTranslation();
  const { locale } = useRouter();

  const result = calculateResult(questions, answers, parties);

  React.useEffect(() => {
    saveResult(result.scores);
  }, [result, saveResult]);

  /*
  const queryString =
    result.scores
      .map((party) => {
        return (
          'score[]=' + encodeURIComponent(`${party.name},${party.percentage}`)
        );
      })
      .join('&') +
    '&election=' +
    encodeURIComponent(election.name);
*/
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
        title={t('election:yourResult')}
      />
      <Page>
        <Container>
          <div className="flex w-full">
            <div className="w-2/3">
              <div className="grid grid-cols-1 gap-4">
                {result.scores.map((score, index) => {
                  return (
                    <div key={score.id}>
                      <button className="block w-full focus-default h-12 bg-[#8186D7] rounded shadow-lg overflow-hidden relative hover:bg-[#7A7FD2]">
                        <motion.div
                          className="h-12 rounded bg-brand-pink shadow-right"
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: score.percentage + '%',
                          }}
                          transition={{
                            delay: index * 0.15,
                            ease: 'easeOut',
                            duration: 1.5,
                          }}
                        />

                        <div className="absolute inset-0 flex items-center justify-between px-4 font-medium text-white">
                          <span>{score.name}</span>

                          <div className="flex items-center">
                            <span>
                              {Intl.NumberFormat(locale).format(
                                parseFloat(score.percentage.toFixed(1))
                              )}
                              %
                            </span>
                            <IconChevronRight className="w-3 h-3 ml-2 text-brand-dark-blue" />
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-1/3 pl-10">
              <div className="mb-1 text-lg font-medium text-white">
                {t('election:adjustResult')}
              </div>
              <Button
                className="w-full mt-3"
                onClick={() => {
                  goToScreen(STEPS.PARTIES);
                }}
              >
                {t('election:changeParties')}
              </Button>

              <Button
                className="w-full mt-3"
                onClick={() => {
                  goToScreen(STEPS.EDIT_ANSWERS);
                }}
              >
                {t('election:changeAnswers')}
              </Button>

              <div className="mt-8 mb-1 text-lg font-medium text-white">
                {t('election:analyzeResult')}
              </div>

              <Button className="w-full mt-3">
                {t('election:compareParties')}
              </Button>

              <Button className="w-full mt-3">
                {t('election:compareQuestion')}
              </Button>
            </div>
          </div>
        </Container>
      </Page>
    </>
  );
};

export default ResultScreen;
