import cn from 'classnames';
import ExternalLink from 'components/external-link';
import PaypalDonationForm from 'components/paypal-donation-form';
import { calculateResult, useElection } from 'contexts/election';
import { motion } from 'framer-motion';
import IconChevronRight from 'icons/chevron-right.svg';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './result.module.css';

const ResultScreen: React.FC = () => {
  const {
    questions,
    answers,
    parties,
    saveResult,
    election,
    compareParty,
    selectedParties,
  } = useElection();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const result = calculateResult(questions, answers, parties);

  React.useEffect(() => {
    saveResult(result.scores);
  }, [result, saveResult]);

  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="w-full mt-2 lg:w-2/3 lg:mt-0">
        <div className="grid grid-cols-1 gap-4">
          {result.scores.map((score, index) => {
            if (selectedParties.indexOf(score.id) === -1)
              return <React.Fragment key={score.id}></React.Fragment>;

            return (
              <div key={score.id}>
                <button
                  className="block w-full focus-default h-12 bg-[#8186D7] rounded shadow-lg overflow-hidden relative hover:bg-[#7A7FD2]"
                  onClick={() => {
                    compareParty(score.id);
                  }}
                >
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

                  <div className="absolute inset-0 flex items-center justify-between px-4 text-sm font-medium text-white lg:text-base">
                    <span>{score.name}</span>

                    <div className="flex items-center">
                      <span>
                        {Intl.NumberFormat(locale).format(
                          parseFloat(score.percentage.toFixed(1))
                        )}
                        %
                      </span>
                      <IconChevronRight
                        className={cn(
                          'w-3 h-3 mis-2 text-brand-dark-blue',
                          styles.icon
                        )}
                      />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/*
     
                    <div className="mt-2">
                      <PaypalDonationForm />
                    </div>

                    {locale === 'de' && (
                      <p>
                        <small>
                          Weitere Zahlungsmöglichkeiten findest du auf unserer{' '}
                          <Link href="/page/verein/spenden" passHref>
                            <a>Spendenseite</a>
                          </Link>
                          .
                        </small>
                      </p>
                    )}
    
     */}

      <div className="w-full lg:w-1/3 lg:pl-10">
        <div className="mt-6 mb-2 font-medium text-brand-highlight text lg:mt-0">
          {t('election:donationTitle')}
        </div>

        <div className="prose-sm prose prose-white">
          <Trans
            i18nKey="election:donationText"
            components={[<p key="p" />, <strong key="s" />]}
          />

          <div className="mt-2">
            <PaypalDonationForm />
          </div>

          {locale === 'de' && (
            <p>
              <small>
                Weitere Zahlungsmöglichkeiten findest du auf unserer{' '}
                <Link href="/page/verein/spenden" passHref>
                  <a>Spendenseite</a>
                </Link>
                .
              </small>
            </p>
          )}
        </div>

        {election.followup_link && (
          <div className="px-5 py-4 mt-6 bg-black rounded lg:mt-6 bg-opacity-20">
            <div className="font-medium text-white text">
              Nachbefragung der Uni Freiburg
            </div>

            <p className="pt-1 text-sm text-white">
              Nimm jetzt an einer kurzen <strong>anonymen Nachbefragung</strong>{' '}
              der <strong>Universität Freiburg</strong> teil. Damit bringst du
              dieses Projekt voran:
            </p>

            <ExternalLink
              size="sm"
              className="mt-2"
              href={election.followup_link}
            >
              Zur Umfrage
            </ExternalLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;
