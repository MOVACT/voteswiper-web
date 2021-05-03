import Button from 'components/button';
import { useElection } from 'contexts/election';
import IconChevronLeft from 'icons/chevron-left.svg';
import IconChevronRight from 'icons/chevron-right.svg';
import React from 'react';

const QuestionCounter: React.FC = () => {
  const { questions, currentQuestion, setCurrentQuestion } = useElection();

  return (
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        <Button
          size="blank"
          className="flex items-center justify-center w-6 h-6 mr-1 rounded-lg"
          disabled={currentQuestion === 0}
          onClick={() => {
            setCurrentQuestion(currentQuestion - 1);
          }}
        >
          <IconChevronLeft className="w-auto h-3" />
        </Button>
        <Button
          size="blank"
          className="flex items-center justify-center w-6 h-6 rounded-lg"
          disabled={currentQuestion === questions.length - 1}
          onClick={() => {
            setCurrentQuestion(currentQuestion + 1);
          }}
        >
          <IconChevronRight className="w-auto h-3" />
        </Button>
      </div>
      <div className="text-sm font-medium text-white lg:text-lg">
        Frage {currentQuestion + 1} von {questions.length}
      </div>
    </div>
  );
};
export default QuestionCounter;
