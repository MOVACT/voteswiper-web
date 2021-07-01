import Button from 'components/button';
import { useElection } from 'contexts/election';
import IconChevronLeft from 'icons/chevron-left.svg';
import IconChevronRight from 'icons/chevron-right.svg';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const QuestionCounter: React.FC = () => {
  const {
    questions,
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
  } = useElection();
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        <Button
          size="blank"
          className="flex items-center justify-center w-6 h-6 mr-1 rounded-lg"
          disabled={currentQuestion === 0}
          onClick={() => {
            goToPreviousQuestion();
          }}
        >
          <IconChevronLeft className="w-auto h-3" />
        </Button>
        <Button
          size="blank"
          className="flex items-center justify-center w-6 h-6 rounded-lg"
          disabled={currentQuestion === questions.length - 1}
          onClick={() => {
            goToNextQuestion();
          }}
        >
          <IconChevronRight className="w-auto h-3" />
        </Button>
      </div>
      <div className="hidden text-lg font-medium text-white lg:block">
        {t('election:questionCounter', {
          current: currentQuestion + 1,
          total: questions.length,
        })}
      </div>
      <div className="text-sm font-medium text-white lg:hidden">
        {currentQuestion + 1}/{questions.length}
      </div>
    </div>
  );
};
export default QuestionCounter;
