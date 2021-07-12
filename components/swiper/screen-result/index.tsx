import { calculateResult, useElection } from 'contexts/election';
import { motion } from 'framer-motion';
import IconChevronRight from 'icons/chevron-right.svg';
import { useRouter } from 'next/router';
import React from 'react';

const ResultScreen: React.FC = () => {
  const {
    questions,
    answers,
    parties,
    saveResult,
    compareParty,
    selectedParties,
  } = useElection();
  const { locale } = useRouter();

  const result = calculateResult(questions, answers, parties);

  React.useEffect(() => {
    saveResult(result.scores);
  }, [result, saveResult]);

  return (
    <div className="flex w-full">
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 gap-4">
          {result.scores.map((score, index) => {
            if (selectedParties.indexOf(score.id) === -1)
              return <React.Fragment key={score.id}></React.Fragment>;

            return (
              <div key={score.id}>
                <button
                  className="block w-full focus-default h-12 bg-[#8186D7] rounded shadow-lg overflow-hidden relative hover:bg-[#7A7FD2]"
                  onClick={() => {
                    compareParty(score.id);
                  }}
                >
                  <motion.div
                    className="h-12 rounded bg-brand-pink shadow-right"
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: score.percentage + '%',
                    }}
                    transition={{
                      delay: index * 0.15,
                      ease: 'easeOut',
                      duration: 1.5,
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-4 text-sm font-medium text-white lg:text-base">
                    <span>{score.name}</span>

                    <div className="flex items-center">
                      <span>
                        {Intl.NumberFormat(locale).format(
                          parseFloat(score.percentage.toFixed(1))
                        )}
                        %
                      </span>
                      <IconChevronRight className="w-3 h-3 ml-2 text-brand-dark-blue" />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
