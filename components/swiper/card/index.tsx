import cn from 'classnames';
import Thesis from 'components/typography/thesis';
import Topic from 'components/typography/topic';
import { useElection } from 'contexts/election';
import {
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import IconPlay from 'icons/play.svg';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import { Question } from 'types/api';

const SWIPE_THRESHOLD = 250;
const OVERLAY_THRESHOLD = 30;

interface Props {
  cardIndex: number;
  question: Question;
}
export interface Ref {
  flyToRight: () => void;
  flyToLeft: () => void;
  flyToTop: () => void;
}

const Card: React.ForwardRefRenderFunction<Ref, Props> = (
  { cardIndex, question },
  ref
) => {
  const {
    answers,
    setAnswer,
    onSwipeLeft,
    onSwipeRight,
    openExplainer,
  } = useElection();
  const { t } = useTranslation();
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

  const flyToRight = React.useCallback(
    (duration?: number): void => {
      setConstrained(false);
      controls.start(
        {
          x: window.innerWidth * 0.7,
          y: 0,
          opacity: 0,
        },
        {
          duration: duration || 0.5,
        }
      );
    },
    [controls]
  );

  const flyToLeft = React.useCallback(
    (duration?: number): void => {
      setConstrained(false);
      controls.start(
        {
          x: window.innerWidth * -0.7,
          y: 0,
          opacity: 0,
        },
        {
          duration: duration || 0.5,
        }
      );
    },
    [controls]
  );

  const onDragEnd = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // Yes, No or Skip
      if (
        info.offset.x > SWIPE_THRESHOLD ||
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
          info.offset.x >
          SWIPE_THRESHOLD /*&&
          info.offset.y > SWIPE_THRESHOLD * -1*/
        ) {
          flyToRight(0.25);
          setTimeout(() => {
            onSwipeRight(question);
          }, 250);
        } else if (
          // No
          info.offset.x <
          SWIPE_THRESHOLD *
            -1 /*&&
          info.offset.y > SWIPE_THRESHOLD * -1*/
        ) {
          flyToLeft(0.25);
          setTimeout(() => {
            onSwipeLeft(question);
          }, 250);
        }
      }
    },
    [controls, onSwipeRight, flyToLeft, flyToRight, onSwipeLeft, question]
  );

  React.useImperativeHandle(ref, () => ({
    flyToRight: () => {
      setConstrained(false);
      controls.start(
        {
          x: window.innerWidth * 0.7,
          y: 0,
          opacity: 0,
        },
        {
          duration: 0.5,
        }
      );
    },
    flyToLeft: flyToLeft,
    flyToTop: () => {
      setConstrained(false);
      controls.start(
        {
          y: window.innerHeight * -0.7,
          x: 0,
          opacity: 0,
        },
        {
          duration: 0.5,
        }
      );
    },
  }));

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
        initial={{
          y: cardIndex * 20,
          scale: 1 - cardIndex * 0.04,
          opacity: 1 - cardIndex * 0.3,
        }}
        animate={{
          y: cardIndex * 20,
          scale: 1 - cardIndex * 0.04,
          opacity: 1 - cardIndex * 0.3,
        }}
        className={cn(
          'h-full rounded-xl shadow-xl overflow-hidden bg-gradient-to-b from-white to-[#d9daeb] text-center flex-col flex ring ring-brand-highlight ring-4',
          answers[question.id].doubleWeighted === false && 'ring-opacity-0'
        )}
      >
        <div className="flex flex-col flex-1 p-6">
          <div className="relative h-[150px] rounded overflow-hidden shadow-lg pointer-events-none">
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              role="presentation"
              sizes="(min-width: 768px) 320px, 100vw"
              src={question.thumbnail.public_link}
            />

            {(question.explainer_text || question.video_url) && (
              <button
                disabled={cardIndex !== 0}
                onClick={() => openExplainer(question.id)}
                className="absolute w-12 h-12 flex items-center justify-center text-white pl-1 -mt-6 -ml-6 bg-gradient-to-b from-[#db67ae] to-[#8186d7] transform hover:scale-[0.97] hover:shadow-sm shadow-xl rounded-full pointer-events-auto focus-default left-1/2 top-1/2"
              >
                <IconPlay className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="my-auto">
            <Topic>{question.topic}</Topic>
            <Thesis>{question.thesis}</Thesis>
          </div>
        </div>

        <button
          className={cn(
            'py-2 text-xs font-medium text-brand-dark-blue bg-brand-primary bg-opacity-10 focus-default',
            cardIndex !== 0 && 'opacity-0 pointer-events-none'
          )}
          onClick={() => {
            setAnswer({
              id: question.id,
              doubleWeighted: !answers[question.id].doubleWeighted,
            });
          }}
          disabled={cardIndex !== 0}
        >
          {t('election:doubleWeight')}
        </button>
      </motion.div>

      <motion.div
        style={{ opacity: noOverlayOpactiy }}
        className="absolute top-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white bg-red-500 rounded-lg pointer-events-none bg-opacity-90"
      >
        {t('election:no')}
      </motion.div>

      <motion.div
        style={{ opacity: yesOverlayOpacity }}
        className="absolute top-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white bg-green-500 rounded-lg pointer-events-none bg-opacity-90"
      >
        {t('election:yes')}
      </motion.div>
    </motion.div>
  );
};

export default React.forwardRef(Card);
