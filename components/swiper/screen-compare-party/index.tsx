import CircleAnswer from 'components/circle-answer';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Thesis from 'components/typography/thesis';
import Topic from 'components/typography/topic';
import { useElection } from 'contexts/election';
import IconChevronLeft from 'icons/chevron-left.svg';
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
                  className="flex items-start pb-2 rounded-lg md:p-6 md:bg-gradient-to-b from-white to-brand-light-blue"
                  key={question.id}
                >
                  <div className="md:w-1/5">
                    <div className="relative h-[120px] rounded overflow-hidden shadow-lg pointer-events-none">
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

                  <div className="flex-1 pt-6 md:px-6 md:pt-0">
                    <Topic>{question.topic}</Topic>
                    <Thesis>{question.thesis}</Thesis>
                  </div>
                  <div className={styles.answer}>
                    <Topic>Deine Antwort</Topic>

                    <CircleAnswer answer={userAnswer} />
                  </div>
                  <div className={styles.answer}>
                    <Topic>{compareParty.name}</Topic>

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
