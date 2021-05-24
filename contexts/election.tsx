import { ANSWERS, STEPS } from 'components/swiper/constants';
import React from 'react';
import { useLockBodyScroll } from 'react-use';
import { Election, Question } from 'types/api2';
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

  screen: STEPS;
  setScreen: (screen: STEPS) => void;
  openExplainer: () => void;
  closeExplainer: () => void;
  startSwiper: () => void;
  endSwiper: () => void;

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
  const [screen, setScreen] = React.useState<STEPS>(STEPS.START);
  useLockBodyScroll(screen === STEPS.SWIPER || screen === STEPS.EXPLAINER);
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
   * Will push a new entry to the browsers history api together with the current state
   * so that it will become possible to navigate to the previous question by using
   * the browsers history api
   */
  const pushHistoryState = React.useCallback(
    (questionNumber: number, screen: STEPS = STEPS.SWIPER) => {
      window.history.pushState(
        {
          currentQuestion: questionNumber,
          screen,
        },
        document.title
      );
    },
    []
  );

  /**
   * Listen to the browser history api
   */
  const historyListener = React.useCallback((ev: PopStateEvent) => {
    if (typeof ev.state.currentQuestion !== 'undefined') {
      setCurrentQuestion(ev.state.currentQuestion);
      setScreen(ev.state.screen);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('popstate', historyListener);

    return () => {
      window.removeEventListener('popstate', historyListener);
    };
  });

  React.useEffect(() => {
    console.log('initial');
    pushHistoryState(0);
  }, [pushHistoryState]);

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
    pushHistoryState(currentQuestion + 1);
    setCurrentQuestion(currentQuestion + 1);
  }, [currentQuestion, pushHistoryState]);

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

  /**
   * Start Swiper
   */
  const startSwiper = React.useCallback(() => {
    pushHistoryState(currentQuestion, STEPS.SWIPER);
    setScreen(STEPS.SWIPER);
  }, [currentQuestion, pushHistoryState]);

  const endSwiper = React.useCallback(() => {
    pushHistoryState(currentQuestion, STEPS.START);
    setScreen(STEPS.START);
  }, [currentQuestion, pushHistoryState]);

  /**
   * Explainer Overlay
   */
  const openExplainer = React.useCallback(() => {
    pushHistoryState(currentQuestion, STEPS.EXPLAINER);
    setScreen(STEPS.EXPLAINER);
  }, [currentQuestion, pushHistoryState]);

  const closeExplainer = React.useCallback(() => {
    pushHistoryState(currentQuestion, STEPS.SWIPER);
    setScreen(STEPS.SWIPER);
  }, [currentQuestion, pushHistoryState]);

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
        screen,
        setScreen,
        openExplainer,
        closeExplainer,
        startSwiper,
        endSwiper,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = (): Context => React.useContext(ElectionContext);
