import cn from 'classnames';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import { CLIENT_EMBED_BACKGROUND } from 'components/client-embed/theme';
import { useElection } from 'contexts/election';
import { AnimatePresence, motion } from 'framer-motion';
import IconChevronLeft from 'icons/chevron-left.svg';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { createPortal } from 'react-dom';
import styles from './explainer-overlay.module.scss';
import ExplainerVideo from './explainer-video';

export type ExplainerVariant = 'default' | 'client-embed';

interface Props {
  inline?: boolean;
  variant?: ExplainerVariant;
}

const ExplainerOverlay: React.FC<Props> = ({
  inline = false,
  variant = 'default',
}) => {
  const { screen, questions, explainer } = useElection();
  const { t } = useTranslation();
  const { back } = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentQuestion = questions.find((q) => q.id === explainer);
  const isClientEmbed = variant === 'client-embed';
  const isOpen =
    screen === 'explainer' &&
    explainer !== null &&
    currentQuestion !== undefined;

  const handleClose = (): void => {
    back();
  };

  if (!isOpen || !currentQuestion) {
    return <AnimatePresence />;
  }

  const overlayContent = (
    <motion.div
      key="explainer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: inline ? 0 : 0.25 }}
      className={cn(
        inline ? styles.embedRoot : styles.portalRoot,
        'p-4 pt-20 md:p-6 md:pt-20',
        !isClientEmbed && !inline && 'lg:bg-brand-primary lg:p-10'
      )}
      style={
        isClientEmbed ? { backgroundColor: CLIENT_EMBED_BACKGROUND } : undefined
      }
    >
      <div className={cn(!inline && styles.scroller, inline && 'pb-10')}>
        <div
          className={cn(
            styles.panel,
            'rounded-xl bg-white p-4 shadow-xl md:p-6'
          )}
        >
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              'mb-3 flex items-center rounded px-6 py-3 font-medium leading-none focus-default md:mb-6',
              isClientEmbed
                ? clientEmbedStyles.explainerBackButton
                : 'bg-brand-primary bg-opacity-10 hover:bg-opacity-20'
            )}
          >
            <IconChevronLeft className="mr-2 h-3 w-3" />
            {t('election:back')}
          </button>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {currentQuestion.video_url && (
              <div
                className={cn(
                  'shrink-0',
                  inline ? 'mx-auto w-full max-w-[350px]' : 'w-full lg:w-auto'
                )}
              >
                <ExplainerVideo
                  src={currentQuestion.video_url}
                  compact={inline}
                />
              </div>
            )}

            {currentQuestion.explainer_text && (
              <div
                className={cn(
                  'prose min-w-0 flex-1',
                  currentQuestion.video_url && 'mt-0',
                  isClientEmbed && clientEmbedStyles.explainerText
                )}
              >
                {currentQuestion.explainer_text}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {inline
        ? overlayContent
        : mounted && createPortal(overlayContent, document.body)}
    </AnimatePresence>
  );
};

export default ExplainerOverlay;
