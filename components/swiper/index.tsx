import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Card from './card';

interface Props {
  open: boolean;
}

const Swiper: React.FC<Props> = ({ open }) => {
  const { stack } = useElection();

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
                    cardIndex={index}
                    key={question.id}
                    question={question}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Swiper;
