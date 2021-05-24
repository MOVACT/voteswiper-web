import Container from 'components/layout/container';
import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconClose from 'icons/close.svg';
import React from 'react';
import Card, { Ref } from './card';
import ExplainerScreen from './explainer-screen';
import QuestionCounter from './question-counter';
import QuestionToSpeech from './question-to-speech';

interface Props {
  open: boolean;
  onRequestClose: () => void;
}

const Swiper: React.FC<Props> = ({ open, onRequestClose }) => {
  const $card = React.useRef<Ref>(null);
  const {
    stack,
    onSwipeRight,
    onSwipeLeft,
    currentQuestion,
    questions,
  } = useElection();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#7577bd] to-[#392f52] z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center pt-16 lg:pt-24 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="fixed top-0 left-0 z-40 flex items-center w-screen h-12 bg-black lg:h-16 bg-opacity-10">
              <Container className="flex">
                <div className="mr-10">
                  <QuestionCounter />
                </div>
                <QuestionToSpeech />

                <div className="ml-auto">
                  <button
                    onClick={() => onRequestClose()}
                    className="flex items-center h-6 text-sm font-medium text-white rounded lg:text-lg text-underline-offset-2 hover:text-brand-highlight hover:underline focus-default"
                  >
                    <IconClose className="w-auto h-5 mr-2" />
                    Beenden
                  </button>
                </div>
              </Container>
            </div>
            <div className="relative z-50 w-full max-w-xs my-auto">
              <div className="h-[450px] relative">
                {stack.map((question, index) => {
                  return (
                    <Card
                      ref={index === 0 ? $card : undefined}
                      cardIndex={index}
                      key={question.id}
                      question={question}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between pt-10">
                <button
                  className="w-16 h-16 font-medium text-white rounded-full shadow-xl hover:shadow-md focus-default bg-gradient-to-b from-red-500 to-red-700"
                  onClick={() => {
                    if ($card.current !== null) {
                      $card.current.flyToLeft();
                    }
                    setTimeout(() => {
                      onSwipeLeft(questions[currentQuestion]);
                    }, 500);
                  }}
                >
                  Nein
                </button>
                <button className="flex flex-col items-center justify-center text-sm font-medium text-white hover:opacity-75">
                  Überspringen
                </button>
                <button
                  className="w-16 h-16 font-medium text-white rounded-full shadow-xl hover:shadow-md focus-default bg-gradient-to-b from-green-vibrant-500 to-green-vibrant-600"
                  onClick={() => {
                    if ($card.current !== null) {
                      $card.current.flyToRight();
                    }
                    setTimeout(() => {
                      onSwipeRight(questions[currentQuestion]);
                    }, 500);
                  }}
                >
                  Ja
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ExplainerScreen />
    </>
  );
};

export default Swiper;
