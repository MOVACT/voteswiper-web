import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Card, { Ref } from './card';

interface Props {
  open: boolean;
}

const Swiper: React.FC<Props> = ({ open }) => {
  const $card = React.useRef<Ref>(null);
  const {
    stack,
    onSwipeRight,
    onSwipeLeft,
    currentQuestion,
    questions,
  } = useElection();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#7577bd] to-[#392f52] z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative w-full max-w-xs my-auto">
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

            <div className="flex justify-between pt-8">
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
  );
};

export default Swiper;
