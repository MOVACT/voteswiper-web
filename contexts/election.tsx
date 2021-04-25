import { ANSWERS } from 'components/swiper/constants';
import React from 'react';
import { Election, Question } from 'types/api';
interface SwiperAnswer {
  answer: ANSWERS;
  doubleWeighted: boolean;
}
interface SwiperAnswers {
  [key: number]: SwiperAnswer;
}
interface SetAnswerArgs {
  id: number;
  answer?: ANSWERS;
  doubleWeighted?: boolean;
}

interface Context {
  questions: Question[];
  election: Election;

  currentQuestion: number;
  setCurrentQuestion: (currentQuestion: number) => void;

  // The next 3 questions for the stack
  stack: Question[];
  answers: SwiperAnswers;

  setAnswer: (args: SetAnswerArgs) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  onSwipeLeft: (question: Question) => void;
  onSwipeRight: (question: Question) => void;
}

interface Props {
  questions: Question[];
  election: Election;
}

const ElectionContext = React.createContext<Context>({} as Context);

export const ElectionProvider: React.FC<Props> = ({
  children,
  questions,
  election,
}) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<SwiperAnswers>(
    (() => {
      // Create a default of all the answers
      const initialAnswers: SwiperAnswers = {};
      questions.map((question) => {
        initialAnswers[question.id] = {
          doubleWeighted: false,
          answer: 0,
        };
      });

      return initialAnswers;
    })()
  );

  /**
   * Answer a question
   */
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

  const goToNextQuestion = React.useCallback(() => {
    setCurrentQuestion(currentQuestion + 1);
  }, [currentQuestion]);

  const goToPreviousQuestion = React.useCallback(() => {
    setCurrentQuestion(currentQuestion - 1);
  }, [currentQuestion]);

  const onSwipeRight = React.useCallback(
    (question: Question) => {
      setAnswer({
        id: question.id,
        answer: ANSWERS.YES,
      });
      goToNextQuestion();
    },
    [setAnswer, goToNextQuestion]
  );

  const onSwipeLeft = React.useCallback(
    (question: Question) => {
      setAnswer({
        id: question.id,
        answer: ANSWERS.NO,
      });
      goToNextQuestion();
    },
    [setAnswer, goToNextQuestion]
  );

  const stack = React.useMemo(() => {
    const sliced = questions.slice(currentQuestion);

    return sliced.slice(0, Math.min(3, sliced.length - 1));
  }, [currentQuestion, questions]);

  return (
    <ElectionContext.Provider
      value={{
        questions,
        election,
        currentQuestion,
        setCurrentQuestion,
        stack,
        answers,
        setAnswer,
        goToNextQuestion,
        goToPreviousQuestion,
        onSwipeLeft,
        onSwipeRight,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = (): Context => React.useContext(ElectionContext);
