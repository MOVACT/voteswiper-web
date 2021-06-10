import cn from 'classnames';
import CircleAnswer from 'components/circle-answer';
import Thesis from 'components/typography/thesis';
import Topic from 'components/typography/topic';
import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconChevronRight from 'icons/chevron-right.svg';
import IconInfo from 'icons/info.svg';
import IconPlay from 'icons/play.svg';
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
  } = useElection();
  const [reason, showReason] = React.useState<null | number>(null);

  const compareParty = parties.find((p) => p.id === comparePartyId);

  if (!compareParty) {
    return <></>;
  }

  return (
    <div className="flex w-full">
      <div className="xl:w-2/3">
        <div className="grid gap-4 col-1">
          {questions.map((question) => {
            const partyAnswer = compareParty.pivot.answers.find(
              (answer) => answer.question_id === question.id
            );
            const userAnswer = answers[question.id];

            return (
              <div
                className="relative flex flex-wrap items-start p-4 rounded-lg md:p-6 bg-gradient-to-b from-white to-brand-light-blue"
                key={question.id}
              >
                <div className="absolute top-0 right-0 mt-4 mr-4 md:w-1/5 md:m-0 md:relative">
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

                <div className="w-full pb-4 md:w-auto md:flex-1 md:px-6 md:pb-0 pr-[80px] lg:pr-0">
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

                <div className={styles.answers}>
                  <div className={styles.answer}>
                    <div className="pt-1 pl-2">
                      <Topic>Deine Antwort</Topic>
                    </div>

                    <CircleAnswer answer={userAnswer} />
                  </div>
                  <div className={styles.answer}>
                    <div className="pt-1 pl-2">
                      <Topic>Partei</Topic>
                    </div>

                    <CircleAnswer answer={partyAnswer} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparePartyScreen;
