import cn from 'classnames';
import Button from 'components/client-embed/button';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import Thesis from 'components/client-embed/typography/thesis';
import Topic from 'components/client-embed/typography/topic';
import { calculateResult, useElection } from 'contexts/election';
import IconCheckmark from 'icons/checkmark.svg';
import IconPlay from 'icons/play.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import { ANSWERS, STEPS } from '../constants';
import styles from './edit-answers.module.css';
import useEditAnswers from './use-edit-answers';

const EditAnswersScreen: React.FC = () => {
  const {
    questions,
    goToScreen,
    parties,
    saveResult,
    openExplainer,
    setAnswers,
  } = useElection();
  const { answers, setAnswer } = useEditAnswers();
  const { t } = useTranslation();

  const result = calculateResult(questions, answers, parties);

  React.useEffect(() => {
    saveResult(result.scores);
  }, [result, saveResult]);

  return (
    <div className="flex w-full">
      <div className="lg:4/5 xl:w-2/3">
        {questions.map((question) => {
          const answer = answers[question.id];

          return (
            <div
              key={question.id}
              className="pb-2 mb-6 rounded-lg lg:max-w-4xl md:p-6 md:bg-gradient-to-b from-white to-brand-light-blue"
            >
              <div className="md:flex">
                <div className="md:w-1/4">
                  <div className="relative h-[148px] rounded overflow-hidden shadow-lg pointer-events-none">
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
                      className={cn(
                        'pointer-events-auto absolute left-1/2 top-1/2 -mt-6 -ml-6 flex h-12 w-12 items-center justify-center rounded-full pl-1 text-white focus-default',
                        clientEmbedStyles.accentButton
                      )}
                    >
                      <IconPlay className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 md:w-3/4 md:pis-6 md:pt-0">
                  <Topic customColorClassName="text-white md:text-brand-primary">
                    {question.topic}
                  </Topic>
                  <Thesis customColorClassName="text-white md:text-brand-primary">
                    {question.thesis}
                  </Thesis>

                  <div className="mt-4">
                    <button
                      className="flex items-center text-sm font-medium text-white rounded md:text-base md:text-brand-dark-blue focus-default"
                      onClick={() => {
                        setAnswer({
                          id: question.id,
                          doubleWeighted: !answer.doubleWeighted,
                        });
                      }}
                    >
                      <div className="flex items-center justify-center w-5 h-5 border border-white rounded-sm mie-2 md:border-brand-primary lg:mie-4 lg:w-6 lg:h-6">
                        {answer.doubleWeighted && (
                          <IconCheckmark className="w-5 h-5 lg:w-6 lg:h-6" />
                        )}
                      </div>
                      {t('election:doubleWeight')}
                    </button>

                    <div className={cn('flex mt-3', styles.row)}>
                      <button
                        onClick={() => {
                          setAnswer({
                            id: question.id,
                            answer: ANSWERS.NO,
                          });
                        }}
                        className={cn(
                          'h-12 w-1/3 rounded-l border text-sm font-medium focus-default md:text-base',
                          answer.answer === ANSWERS.NO
                            ? clientEmbedStyles.editAnswerNoSelected
                            : 'border-white text-white hover:bg-white hover:bg-opacity-10 md:border-brand-primary md:text-brand-primary'
                        )}
                      >
                        {t('election:no')}
                      </button>
                      <button
                        onClick={() => {
                          setAnswer({
                            id: question.id,
                            answer: ANSWERS.NONE,
                          });
                        }}
                        className={cn(
                          'w-1/3 h-12 text-sm md:text-base font-medium border border-l-0 px-3 border-r-0 text-white border-white md:border-brand-primary focus-default',
                          answer.answer === ANSWERS.NONE
                            ? 'text-brand-primary md:text-white bg-white md:bg-brand-primary'
                            : 'hover:bg-opacity-10 hover:bg-brand-primary md:text-brand-primary'
                        )}
                      >
                        {t('election:noAnswer')}
                      </button>
                      <button
                        onClick={() => {
                          setAnswer({
                            id: question.id,
                            answer: ANSWERS.YES,
                          });
                        }}
                        className={cn(
                          'h-12 w-1/3 rounded-r border text-sm font-medium focus-default md:text-base',
                          answer.answer === ANSWERS.YES
                            ? clientEmbedStyles.editAnswerYesSelected
                            : 'border-white text-white hover:bg-white hover:bg-opacity-10 md:border-brand-primary md:text-brand-primary'
                        )}
                      >
                        {t('election:yes')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div
          className={cn(
            'fixed bottom-0 left-0 z-50 flex w-screen px-4 pt-3 pb-5 lg:relative lg:mt-10 lg:w-auto lg:justify-end lg:bg-transparent lg:p-0',
            clientEmbedStyles.stickyFooter
          )}
        >
          <Button
            color="primary"
            size="blank"
            className="w-full py-2.5 px-4 lg:px-10 lg:py-4 text-base lg:w-auto lg:text-lg rounded-xl"
            onClick={() => {
              setAnswers({ ...answers });
              goToScreen(STEPS.RESULT);
            }}
          >
            {t('election:goToResult')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditAnswersScreen;
