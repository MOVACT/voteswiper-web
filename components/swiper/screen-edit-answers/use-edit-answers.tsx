import { SetAnswerArgs, SwiperAnswers, useElection } from 'contexts/election';
import React from 'react';

interface EditAnswers {
  answers: SwiperAnswers;
  setAnswer: (args: SetAnswerArgs) => void;
}

const useEditAnswers = (): EditAnswers => {
  const { answers: originalAnswers } = useElection();

  const [answers, setAnswers] = React.useState<SwiperAnswers>(originalAnswers);

  const setAnswer = React.useCallback(
    ({ id, answer, doubleWeighted }: SetAnswerArgs) => {
      const newAnswers = answers;
      newAnswers[id] = {
        // Take the provided answer or use the existing one if not set
        answer: typeof answer === 'undefined' ? answers[id].answer : answer,
        doubleWeighted:
          typeof doubleWeighted === 'undefined'
            ? answers[id].doubleWeighted
            : doubleWeighted,
      };

      setAnswers({ ...newAnswers });
    },
    [answers]
  );

  return { answers, setAnswer };
};

export default useEditAnswers;
