import cn from 'classnames';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import { CLIENT_EMBED_BACKGROUND } from 'components/client-embed/theme';
import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconChevronLeft from 'icons/chevron-left.svg';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import Video from './video';

interface Props {
  inline?: boolean;
}

const scrollContainerStyle: React.CSSProperties = {
  WebkitOverflowScrolling: 'touch',
};

const ExplainerScreen: React.FC<Props> = ({ inline = false }) => {
  const { screen, questions, closeExplainer, explainer } = useElection();
  const { t } = useTranslation();
  const { back } = useRouter();

  const currentQuestion = questions.find((q) => q.id === explainer);

  return (
    <AnimatePresence>
      {screen === 'explainer' &&
        explainer !== null &&
        typeof currentQuestion !== 'undefined' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: inline ? 0 : 0.25 }}
            className={cn(
              'z-50 overflow-y-auto overscroll-y-contain p-4 pt-20 md:p-6 md:pt-20 lg:p-10',
              inline ? 'absolute inset-0 pt-16' : 'fixed inset-0'
            )}
            style={{
              ...scrollContainerStyle,
              backgroundColor: CLIENT_EMBED_BACKGROUND,
            }}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              className="mx-auto w-full max-w-4xl rounded-xl bg-white p-4 shadow-xl md:p-6"
            >
              <button
                onClick={() => {
                  closeExplainer();
                  back();
                }}
                className={cn(
                  'mb-3 flex items-center rounded px-6 py-3 font-medium leading-none focus-default md:mb-6',
                  clientEmbedStyles.explainerBackButton
                )}
              >
                <IconChevronLeft className="mr-2 h-3 w-3" />
                {t('election:back')}
              </button>
              <div className="lg:flex lg:items-start lg:gap-6">
                {currentQuestion.video_url && (
                  <>
                    {inline ? (
                      <div className="mx-auto max-w-[350px] overflow-hidden rounded">
                        <Video inline src={currentQuestion.video_url} />
                      </div>
                    ) : (
                      <Video src={currentQuestion.video_url} />
                    )}
                  </>
                )}
                {currentQuestion.explainer_text && (
                  <div
                    className={cn(
                      'prose mt-6 max-h-[50vh] overflow-y-auto overscroll-y-contain lg:mt-0 lg:max-h-[60vh] lg:flex-1',
                      clientEmbedStyles.explainerText
                    )}
                    style={scrollContainerStyle}
                  >
                    <div className="lg:mis-2">
                      {currentQuestion.explainer_text}
                    </div>
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
