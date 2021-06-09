import cn from 'classnames';
import Button from 'components/button';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Thesis from 'components/typography/thesis';
import Topic from 'components/typography/topic';
import { calculateResult, useElection } from 'contexts/election';
import IconCheckmark from 'icons/checkmark.svg';
import IconPlay from 'icons/play.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import { ANSWERS, STEPS } from '../constants';
import useEditAnswers from './use-edit-answers';

const EditAnswersScreen: React.FC = () => {
  const {
    country,
    election,
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
        title={t('election:changeAnswers')}
      />
      <Page>
        <Container>
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
                            className="absolute w-12 h-12 flex items-center justify-center text-white pl-1 -mt-6 -ml-6 bg-gradient-to-b from-[#db67ae] to-[#8186d7] transform hover:scale-[0.97] hover:shadow-sm shadow-xl rounded-full pointer-events-auto focus-default left-1/2 top-1/2"
                          >
                            <IconPlay className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-6 md:w-3/4 md:pl-6 md:pt-0">
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
                            <div className="flex items-center justify-center w-5 h-5 mr-2 border border-white rounded-sm md:border-brand-primary lg:mr-4 lg:w-6 lg:h-6">
                              {answer.doubleWeighted && (
                                <IconCheckmark className="w-5 h-5 lg:w-6 lg:h-6" />
                              )}
                            </div>
                            {t('election:doubleWeight')}
                          </button>

                          <div className="flex mt-3">
                            <button
                              onClick={() => {
                                setAnswer({
                                  id: question.id,
                                  answer: ANSWERS.NO,
                                });
                              }}
                              className={cn(
                                'w-1/3 h-12 text-sm md:text-base font-medium border rounded-l border-white text-white md:border-brand-primary focus-default',
                                answer.answer === ANSWERS.NO
                                  ? 'text-brand-primary md:text-white bg-white md:bg-brand-primary'
                                  : 'hover:bg-opacity-10 hover:bg-brand-primary md:text-brand-primary'
                              )}
                            >
                              Nein
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
                              Keine Antwort
                            </button>
                            <button
                              onClick={() => {
                                setAnswer({
                                  id: question.id,
                                  answer: ANSWERS.YES,
                                });
                              }}
                              className={cn(
                                'w-1/3 h-12 text-sm md:text-base font-medium border rounded-r text-white border-white md:border-brand-primary focus-default',
                                answer.answer === ANSWERS.YES
                                  ? 'text-brand-primary md:text-white bg-white md:bg-brand-primary'
                                  : 'hover:bg-opacity-10 hover:bg-brand-primary md:text-brand-primary'
                              )}
                            >
                              Ja
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="fixed bottom-0 left-0 z-50 w-screen px-4 pt-3 pb-5 lg:mt-10 lg:relative lg:w-auto lg:p-0 lg:bg-transparent lg:flex lg:justify-end bg-brand-dark-blue bg-opacity-90">
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
        </Container>
      </Page>
    </>
  );
};

export default EditAnswersScreen;
