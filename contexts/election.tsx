import { ANSWERS, STEPS } from 'components/swiper/constants';
import React from 'react';
import { useLockBodyScroll } from 'react-use';
import { Country, Election, Party, Question } from 'types/api';
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
  country: Country;
  election: Election;
  parties: Party[];

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

  selectedParties: number[];
  toggleParty: (partyId: number) => void;

  goToScreen: (swiperScreen: STEPS) => void;
}

interface Props {
  questions: Question[];
  election: Election;
  parties: Party[];
  country: Country;
}

const ElectionContext = React.createContext<Context>({} as Context);

export type PartyScore = {
  id: number;
  name: string;
  score: number;
  percentage: number;
};

export const calculateResult = (
  questions: Question[],
  userAnswers: SwiperAnswers,
  parties: Party[]
): { scores: PartyScore[]; totalScore: number } => {
  const partyScore: PartyScore[] = [];
  let relevantQuestions = 0;

  // Set initial scores
  parties.map((party) => {
    partyScore.push({
      id: party.id,
      score: 0,
      percentage: 0,
      name: party.name,
    });
  });

  questions.map((question) => {
    const userAnswer = userAnswers[question.id].answer;
    // If a user double weighted their answer, it will be worth two points
    const pointsToAdd = userAnswers[question.id].doubleWeighted ? 2 : 1;

    if (userAnswer !== ANSWERS.NONE) {
      relevantQuestions = relevantQuestions + pointsToAdd;

      // Loop over parties
      parties.map((party) => {
        let addToScore = 0;

        const partyAnswer = party.pivot.answers.find(
          (a) => a.question_id === question.id
        )?.answer;

        // Make sure party has given an answer
        if (partyAnswer !== 0 && userAnswer === partyAnswer) {
          // if same answer, count 1 up
          addToScore = pointsToAdd;
        }

        const index = partyScore.findIndex((i) => i.id === party.id);
        partyScore[index].score = partyScore[index].score + addToScore;
      });
    }
  });

  partyScore.map((score, index) => {
    // relevantQuestions === 100%
    // score === x%

    partyScore[index] = {
      ...score,
      percentage: +(
        Math.round(
          (((score.score * 100) / relevantQuestions +
            'e+1') as unknown) as number
        ) + 'e-1'
      ),
    };
  });

  // Sort from lowest to highest
  partyScore.sort((a, b) => (a.score - b.score > 0 ? -1 : 1));

  return {
    scores: partyScore,
    totalScore: relevantQuestions,
  };
};

export const ElectionProvider: React.FC<Props> = ({
  children,
  questions,
  country,
  parties,
  election,
}) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [screen, setScreen] = React.useState<STEPS>(STEPS.PARTIES);
  const [selectedParties, setSelectedParties] = React.useState<number[]>(
    parties.map((party) => party.id)
  );

  useLockBodyScroll(screen === STEPS.SWIPER || screen === STEPS.EXPLAINER);

  /*const [answers, setAnswers] = React.useState<SwiperAnswers>(
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
  );*/

  const [answers, setAnswers] = React.useState<SwiperAnswers>({
    1318: { answer: 2, doubleWeighted: false },
    1319: { answer: 1, doubleWeighted: false },
    1320: { answer: 2, doubleWeighted: true },
    1321: { answer: 1, doubleWeighted: false },
    1322: { answer: 1, doubleWeighted: false },
    1323: { answer: 2, doubleWeighted: false },
    1324: { answer: 2, doubleWeighted: false },
    1325: { answer: 2, doubleWeighted: false },
    1326: { answer: 2, doubleWeighted: false },
    1327: { answer: 1, doubleWeighted: false },
    1328: { answer: 1, doubleWeighted: false },
    1329: { answer: 1, doubleWeighted: false },
    1330: { answer: 2, doubleWeighted: false },
    1331: { answer: 2, doubleWeighted: false },
    1332: { answer: 2, doubleWeighted: false },
    1333: { answer: 2, doubleWeighted: false },
    1334: { answer: 2, doubleWeighted: false },
    1335: { answer: 2, doubleWeighted: false },
    1336: { answer: 2, doubleWeighted: false },
    1337: { answer: 2, doubleWeighted: false },
    1338: { answer: 1, doubleWeighted: false },
    1339: { answer: 1, doubleWeighted: false },
    1340: { answer: 1, doubleWeighted: false },
    1341: { answer: 1, doubleWeighted: false },
    1342: { answer: 2, doubleWeighted: false },
    1343: { answer: 2, doubleWeighted: false },
    1344: { answer: 2, doubleWeighted: false },
    1345: { answer: 2, doubleWeighted: false },
    1346: { answer: 2, doubleWeighted: false },
    1347: { answer: 2, doubleWeighted: false },
  });

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
    if (currentQuestion === questions.length - 1) {
      pushHistoryState(currentQuestion + 1, STEPS.PARTIES);
      setScreen(STEPS.PARTIES);
    } else {
      pushHistoryState(currentQuestion + 1);
      setCurrentQuestion(currentQuestion + 1);
    }
  }, [currentQuestion, pushHistoryState, questions]);

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

    return sliced.slice(0, 3);
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

  /**
   * Parties
   */
  const toggleParty = React.useCallback(
    (partyId: number) => {
      const currentParties = selectedParties;

      if (currentParties.includes(partyId)) {
        currentParties.splice(currentParties.indexOf(partyId), 1);
      } else {
        currentParties.push(partyId);
      }

      setSelectedParties([...currentParties]);
    },
    [selectedParties]
  );

  const goToScreen = React.useCallback(
    (swiperScreen: STEPS) => {
      pushHistoryState(currentQuestion, swiperScreen);
      window.scrollTo({
        top: 0,
      });
      setScreen(swiperScreen);
    },
    [currentQuestion, pushHistoryState]
  );

  return (
    <ElectionContext.Provider
      value={{
        questions,
        country,
        parties,
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
        toggleParty,
        selectedParties,
        goToScreen,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = (): Context => React.useContext(ElectionContext);
