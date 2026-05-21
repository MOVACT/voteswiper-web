import cn from 'classnames';
import Button from 'components/client-embed/button';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import { useElection } from 'contexts/election';
import IconChevronLeft from 'icons/chevron-left.svg';
import IconChevronRight from 'icons/chevron-right.svg';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styles from './counter.module.css';

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
      <div className="flex items-center mie-2">
        <Button
          color="nav"
          size="blank"
          className="mie-1 flex h-6 w-6 items-center justify-center rounded-lg"
          disabled={currentQuestion === 0}
          onClick={() => {
            goToPreviousQuestion();
          }}
        >
          <IconChevronLeft className={cn('w-auto h-3', styles.icon)} />
        </Button>
        <Button
          color="nav"
          size="blank"
          className="flex h-6 w-6 items-center justify-center rounded-lg"
          disabled={currentQuestion === questions.length - 1}
          onClick={() => {
            goToNextQuestion();
          }}
        >
          <IconChevronRight className={cn('w-auto h-3', styles.icon)} />
        </Button>
      </div>
      <div
        className={cn(
          'hidden text-lg font-medium lg:block',
          clientEmbedStyles.topBarText
        )}
      >
        {t('election:questionCounter', {
          current: currentQuestion + 1,
          total: questions.length,
        })}
      </div>
      <div
        className={cn(
          'text-sm font-medium lg:hidden',
          clientEmbedStyles.topBarText
        )}
      >
        {currentQuestion + 1}/{questions.length}
      </div>
    </div>
  );
};
export default QuestionCounter;
