import { IconPlayerTrackNext } from '@tabler/icons';
import cn from 'classnames';
import Container from 'components/client-embed/layout/container';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import { CLIENT_EMBED_BACKGROUND } from 'components/client-embed/theme';
import { useElection } from 'contexts/election';
import { motion } from 'framer-motion';
import IconClose from 'icons/close.svg';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Card, { Ref } from './card';
import QuestionCounter from './question-counter';
import QuestionToSpeech from './question-to-speech';
import styles from './swiper.module.css';

interface Props {
  onRequestClose: () => void;
}

const Swiper: React.FC<Props> = ({ onRequestClose }) => {
  const $card = React.useRef<Ref>(null);
  const { t } = useTranslation();
  const {
    stack,
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    currentQuestion,
    questions,
  } = useElection();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center overflow-x-hidden overflow-y-auto px-3 pb-10 pt-16 lg:px-0 lg:pt-24"
      style={{ backgroundColor: CLIENT_EMBED_BACKGROUND }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className={cn(
          'fixed top-0 left-0 z-40 flex h-12 w-screen items-center lg:h-16',
          clientEmbedStyles.swiperTopBar
        )}
      >
        <Container className="flex">
          <div className="mie-10">
            <QuestionCounter />
          </div>
          <QuestionToSpeech />

          <div className="mis-auto">
            <button
              onClick={() => onRequestClose()}
              className={cn(
                'flex h-6 items-center rounded text-sm font-medium text-underline-offset-2 hover:underline focus-default lg:text-lg',
                clientEmbedStyles.topBarLink
              )}
            >
              <IconClose className="w-auto h-5 mie-2" />
              {t('election:exit')}
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

        <div className={cn('flex justify-between pt-10', styles.actions)}>
          <button
            className={cn(
              'focus-default h-16 w-16 rounded-full font-medium text-white',
              clientEmbedStyles.accentButton
            )}
            onClick={() => {
              if ($card.current !== null) {
                $card.current.flyToLeft();
              }
              setTimeout(() => {
                onSwipeLeft(questions[currentQuestion]);
              }, 500);
            }}
          >
            {t('election:no')}
          </button>
          <button
            onClick={() => {
              if ($card.current !== null) {
                $card.current.flyToTop();
              }
              setTimeout(() => {
                onSwipeUp(questions[currentQuestion]);
              }, 500);
            }}
            className="flex flex-col items-center justify-center text-sm font-medium text-white focus-default hover:opacity-75"
          >
            <IconPlayerTrackNext className="h-4 mb-px" />
            {t('election:skip')}
          </button>
          <button
            className={cn(
              'focus-default h-16 w-16 rounded-full font-medium text-white',
              clientEmbedStyles.yesButton
            )}
            onClick={() => {
              if ($card.current !== null) {
                $card.current.flyToRight();
              }
              setTimeout(() => {
                onSwipeRight(questions[currentQuestion]);
              }, 500);
            }}
          >
            {t('election:yes')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Swiper;
