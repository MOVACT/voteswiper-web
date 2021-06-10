import cn from 'classnames';
import CircleAnswer from 'components/circle-answer';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Thesis from 'components/typography/thesis';
import Topic from 'components/typography/topic';
import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconChevronLeft from 'icons/chevron-left.svg';
import IconChevronRight from 'icons/chevron-right.svg';
import IconInfo from 'icons/info.svg';
import IconPlay from 'icons/play.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './compare.module.css';

const ComparePartyScreen: React.FC = () => {
  const {
    country,
    election,
    questions,
    answers,
    parties,
    openExplainer,
    saveResult,
    goToScreen,
    comparePartyId,
  } = useElection();
  const { t } = useTranslation();
  const { back } = useRouter();
  const [reason, showReason] = React.useState<null | number>(null);

  const compareParty = parties.find((p) => p.id === comparePartyId);

  if (!compareParty) {
    return <></>;
  }

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
        title={t('election:compareParty', { party: compareParty.name })}
      />
      <Page>
        <Container>
          <button
            onClick={() => {
              back();
            }}
            className="flex items-center px-6 py-3 mb-6 font-medium leading-none text-white bg-white rounded bg-opacity-10 focus-default hover:bg-opacity-20"
          >
            <IconChevronLeft className="w-3 h-3 mr-2" />
            {t('election:back')}
          </button>
          <div className="grid gap-4 col-1">
            {questions.map((question) => {
              const partyAnswer = compareParty.pivot.answers.find(
                (answer) => answer.question_id === question.id
              );
              const userAnswer = answers[question.id];

              return (
                <div
                  className="flex flex-wrap items-start p-4 rounded-lg md:p-6 bg-gradient-to-b from-white to-brand-light-blue"
                  key={question.id}
                >
                  <div className="w-1/2 md:w-1/5">
                    <div className="relative h-[60px] lg:h-[120px] rounded overflow-hidden shadow-lg pointer-events-none">
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

                  <div className="w-full pt-4 pb-4 md:w-auto md:flex-1 md:px-6 md:pt-0 md:pb-0">
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
                            className={cn(
                              'flex items-center text-sm lg:text-base focus-default font-medium underline text-brand-dark-blue hover:text-brand-primary',
                              styles.reasonLink
                            )}
                          >
                            Begründung der Partei lesen
                            <IconChevronRight className="h-3 ml-px" />
                          </button>

                          <AnimatePresence>
                            {reason === question.id && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ ease: 'easeOut', duration: 0.5 }}
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
                          Die Partei hat ihre Antwort nicht begründet.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <div className="pt-1 pl-2 md:pt-0 md:pl-0">
                      <Topic>Deine Antwort</Topic>
                    </div>

                    <CircleAnswer answer={userAnswer} />
                  </div>
                  <div className={styles.answer}>
                    <div className="pt-1 pl-2 md:pt-0 md:pl-0">
                      <Topic>Partei</Topic>
                    </div>

                    <CircleAnswer answer={partyAnswer} />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Page>
    </>
  );
};

export default ComparePartyScreen;
