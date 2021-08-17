import cn from 'classnames';
import CircleAnswer from 'components/circle-answer';
import ExternalLink from 'components/external-link';
import Thesis from 'components/typography/thesis';
import Topic from 'components/typography/topic';
import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconChevronRight from 'icons/chevron-right.svg';
import IconInfo from 'icons/info.svg';
import IconPlay from 'icons/play.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import styles from './compare.module.css';

const ComparePartyScreen: React.FC = () => {
  const {
    questions,
    answers,
    parties,
    openExplainer,
    comparePartyId,
    compareParty,
  } = useElection();
  const [reason, showReason] = React.useState<null | number>(null);
  const { t } = useTranslation();

  const comparedParty = parties.find((p) => p.id === comparePartyId);

  return (
    <>
      <div className="flex flex-wrap items-center justify-start text-lg font-medium text-white xl:text-xl">
        <div className="mie-3">{t('election:compareAnswersWith')}</div>
        <select
          value={comparePartyId ?? ''}
          className="w-full font-medium bg-transparent border-b lg:w-auto focus-default"
          onChange={(e) => {
            compareParty(
              e.target.value === '' ? null : parseInt(e.target.value)
            );
          }}
        >
          <option value="">{t('election:chooseParty')}</option>
          {parties.map((party) => {
            return (
              <option key={party.id} value={party.id}>
                {party.name}
              </option>
            );
          })}
        </select>
      </div>

      {comparedParty && (
        <div className="flex flex-col-reverse w-full lg:flex-row">
          <div className="lg:w-2/3">
            <div className="grid gap-4 mt-6 col-1">
              {questions.map((question) => {
                const partyAnswer = comparedParty.pivot.answers.find(
                  (answer) => answer.question_id === question.id
                );
                const userAnswer = answers[question.id];

                return (
                  <div
                    className="relative flex flex-wrap items-start p-4 rounded-lg md:p-6 bg-gradient-to-b from-white to-brand-light-blue"
                    key={question.id}
                  >
                    <div className={styles.video}>
                      <div className="relative h-[60px] md:h-[80px] w-[60px] md:w-full rounded-full lg:h-[120px] md:rounded overflow-hidden shadow-lg pointer-events-none">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          role="presentation"
                          sizes="(min-width: 768px) 320px, 100vw"
                          src={question.thumbnail.public_link}
                        />

                        <button
                          onClick={() => openExplainer(question.id)}
                          className="absolute w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center text-white pl-1 -mt-4 -ml-4 lg:-mt-6 lg:-ml-6 bg-gradient-to-b from-[#db67ae] to-[#8186d7] transform hover:scale-[0.97] hover:shadow-sm shadow-xl rounded-full pointer-events-auto focus-default left-1/2 top-1/2"
                        >
                          <IconPlay className="h-3 lg:h-5" />
                        </button>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'w-full pb-4 md:w-auto md:flex-1 md:pl-6 md:pb-0',
                        styles.content
                      )}
                    >
                      <Topic>{question.topic}</Topic>
                      <Thesis>{question.thesis}</Thesis>

                      <div className="mt-1 md:mt-2 lg:mt-4">
                        {partyAnswer?.reason ? (
                          <>
                            <button
                              onClick={() => {
                                showReason(
                                  reason === question.id ? null : question.id
                                );
                              }}
                              className="flex items-center text-sm font-medium underline lg:text-base focus-default text-brand-dark-blue hover:text-brand-primary text-underline-offset-2 "
                            >
                              {t('election:readReasoning')}
                              <IconChevronRight className="h-3 ml-px" />
                            </button>

                            <AnimatePresence>
                              {reason === question.id && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  transition={{
                                    ease: 'easeOut',
                                    duration: 0.5,
                                  }}
                                  className="overflow-hidden text-sm lg:text-base"
                                >
                                  <div className="pt-2 prose-sm lg:prose">
                                    {partyAnswer?.reason}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <div className="flex items-center font-medium text-brand-primary">
                            <IconInfo className="h-5 mr-2 text-brand-dark-blue" />
                            {t('election:noReasoningAvailable')}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.answers}>
                      <div className={styles.answer}>
                        <div className="pt-1 pl-2">
                          <Topic>{t('election:yourAnswer')}</Topic>
                        </div>

                        <CircleAnswer answer={userAnswer} />
                      </div>
                      <div className={styles.answer}>
                        <div className="pt-1 pl-2">
                          <Topic>{t('election:party')}</Topic>
                        </div>

                        <CircleAnswer answer={partyAnswer} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 lg:mt-6 lg:w-1/3 lg:pl-8">
            <div className="flex flex-col items-center justify-center mb-4 lg:mb-8">
              <div className="flex items-center justify-center w-24 h-24 rounded-full shadow-lg bg-gradient-to-b from-white to-brand-light-blue">
                <div className="relative w-16 h-16">
                  <Image
                    src={comparedParty.logo.public_link}
                    alt={comparedParty.full_name}
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              </div>
              <div className="pt-2 text-lg font-medium text-white">
                {comparedParty.full_name}
              </div>
            </div>
            {comparedParty.url && (
              <div className="mt-3">
                <ExternalLink href={comparedParty.url}>
                  {t('election:website')}
                </ExternalLink>
              </div>
            )}
            {comparedParty.pivot.program_link && (
              <div className="mt-3">
                <ExternalLink href={comparedParty.pivot.program_link}>
                  {t('election:program')}
                </ExternalLink>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ComparePartyScreen;
