import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconChevronLeft from 'icons/chevron-left.svg';
import React from 'react';
import Video from './video';

const ExplainerScreen: React.FC = () => {
  const { screen, stack, closeExplainer } = useElection();

  // Current Question must be index 0 at stack
  const currentQuestion = stack[0];

  return (
    <AnimatePresence>
      {screen === 'explainer' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-6 overflow-auto lg:p-10 bg-brand-primary"
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            className="p-6 my-auto bg-white shadow-xl rounded-xl"
          >
            <button
              onClick={() => closeExplainer()}
              className="flex items-center px-6 py-3 mb-6 font-medium leading-none rounded bg-brand-primary bg-opacity-10 focus-default hover:bg-opacity-20"
            >
              <IconChevronLeft className="w-3 h-3 mr-2" />
              Zurück
            </button>
            <div className="lg:flex">
              {currentQuestion.video_url && (
                <Video src={currentQuestion.video_url} />
              )}
              {currentQuestion.explainer_text && (
                <div className="mt-6 lg:mt-0 lg:max-w-[450px] lg:w-screen lg:pl-6 prose lg:overflow-auto lg:max-h-[60vh] lg:overflow-scroll">
                  {currentQuestion.explainer_text}
                  {currentQuestion.explainer_text}
                  {currentQuestion.explainer_text}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExplainerScreen;
