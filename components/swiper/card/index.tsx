import cn from 'classnames';
import { useElection } from 'contexts/election';
import {
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { Question } from 'types/api';
import asset from 'util/asset';
import { ANSWERS } from '../constants';

const SWIPE_THRESHOLD = 250;
const OVERLAY_THRESHOLD = 30;

interface Props {
  cardIndex: number;
  question: Question;
}

const Card: React.FC<Props> = ({ cardIndex, question }) => {
  const { answers, setAnswer, goToNextQuestion } = useElection();
  const [constrained, setConstrained] = React.useState<boolean>(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const input = [SWIPE_THRESHOLD * -1, 0, SWIPE_THRESHOLD];

  // Interpolate Rotation
  const rotateOutput = [-5, 0, 5];
  const rotate = useTransform(x, input, rotateOutput);

  const noOverlayOpactiy = useTransform(x, (xValue) => {
    if (xValue < OVERLAY_THRESHOLD * -1) {
      return Math.min(1, (xValue * -1) / SWIPE_THRESHOLD);
    }

    return 0;
  });

  const yesOverlayOpacity = useTransform(x, (xValue) => {
    if (xValue > OVERLAY_THRESHOLD) {
      return Math.min(1, xValue / SWIPE_THRESHOLD);
    }

    return 0;
  });

  const controls = useAnimation();

  const onSwipeRight = React.useCallback(() => {
    setAnswer({
      id: question.id,
      answer: ANSWERS.YES,
    });
    goToNextQuestion();
  }, [question, setAnswer, goToNextQuestion]);

  const onSwipeLeft = React.useCallback(() => {
    setAnswer({
      id: question.id,
      answer: ANSWERS.NO,
    });
    goToNextQuestion();
  }, [question, setAnswer, goToNextQuestion]);

  const onDragEnd = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // Yes, No or Skip
      if (
        info.offset.x > SWIPE_THRESHOLD ||
        info.offset.y < SWIPE_THRESHOLD * -1 ||
        info.offset.x < SWIPE_THRESHOLD * -1
      ) {
        setConstrained(false);
        controls.start({
          x: info.offset.x * 3,
          y: info.offset.y * 3,
          opacity: 0,
        });

        if (
          // Yes
          info.offset.x > SWIPE_THRESHOLD &&
          info.offset.y > SWIPE_THRESHOLD * -1
        ) {
          onSwipeRight();
        } else if (
          // No
          info.offset.x < SWIPE_THRESHOLD * -1 &&
          info.offset.y > SWIPE_THRESHOLD * -1
        ) {
          onSwipeLeft();
        }
      }
    },
    [controls, onSwipeRight, onSwipeLeft]
  );

  return (
    <motion.div
      className={cn(
        'absolute w-full h-full',
        cardIndex === 0 && 'z-[3]',
        cardIndex === 1 && 'z-[2]',
        cardIndex === 2 && 'z-[1]'
      )}
      animate={controls}
      dragElastic={1}
      drag={cardIndex === 0}
      style={{ x, y, rotate }}
      onDragEnd={onDragEnd}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <motion.div
        animate={{ y: cardIndex * 10, scale: 1 - cardIndex * 0.02 }}
        className={cn(
          'h-full bg-white rounded-xl shadow-xl overflow-hidden gradient-to-b from-white to-[#d9daeb] text-center flex-col flex ring ring-brand-highlight ring-4',
          answers[question.id].doubleWeighted === false && 'ring-opacity-0'
        )}
      >
        <div className="flex flex-col flex-1 p-4 lg:p-6">
          <div className="relative h-[150px] rounded overflow-hidden shadow-lg pointer-events-none">
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={asset(question.thumbnail)}
            />
          </div>
          <div className="my-auto">
            <div className="pb-2 text-xs font-medium tracking-widest uppercase text-brand-primary">
              {question.title}
            </div>
            <div className="font-medium leading-5 lg:leading-6 text-brand-dark-blue lg:text-lg">
              {question.question}
            </div>
          </div>
        </div>

        <button
          className="py-2 text-xs font-medium bg-red-500 text-brand-dark-blue bg-brand-primary bg-opacity-10 focus-default"
          onClick={() => {
            setAnswer({
              id: question.id,
              doubleWeighted: !answers[question.id].doubleWeighted,
            });
          }}
        >
          Frage doppelt gewichten
        </button>
      </motion.div>

      <motion.div
        style={{ opacity: noOverlayOpactiy }}
        className="absolute top-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white bg-red-500 rounded-lg pointer-events-none bg-opacity-90"
      >
        Nein
      </motion.div>

      <motion.div
        style={{ opacity: yesOverlayOpacity }}
        className="absolute top-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white bg-green-500 rounded-lg pointer-events-none bg-opacity-90"
      >
        Ja
      </motion.div>
    </motion.div>
  );
};

export default Card;
