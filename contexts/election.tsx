import React from 'react';
import { Election, Question } from 'types/api';

interface Context {
  questions: Question[];
  election: Election;
  currentQuestion: number;
  setCurrentQuestion: (currentQuestion: number) => void;
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

  return (
    <ElectionContext.Provider
      value={{ questions, election, currentQuestion, setCurrentQuestion }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = (): Context => React.useContext(ElectionContext);
