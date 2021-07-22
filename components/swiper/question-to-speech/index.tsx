import cn from 'classnames';
import { useElection } from 'contexts/election';
import IconVolume from 'icons/volume.svg';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './speech.module.css';

const QuestionToSpeech: React.FC = () => {
  const [isApiAvailable, setApiAvailable] = React.useState(true);
  const { currentQuestion, questions } = useElection();
  const { t } = useTranslation();
  const { locale } = useRouter();

  const question = questions[currentQuestion];

  React.useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      setApiAvailable(false);
    }
  }, []);

  const read = React.useCallback(() => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = question.thesis;
    msg.lang = locale || 'en';

    speechSynthesis.speak(msg);
  }, [locale, question]);

  if (!isApiAvailable) return <></>;

  return (
    <button
      onClick={read}
      className="items-center hidden text-sm font-medium text-white rounded lg:flex lg:text-lg hover:underline hover:text-brand-highlight text-underline-offset-2 focus-default"
    >
      <IconVolume className={cn('w-auto h-6 mie-2', styles.icon)} />
      {t('election:readQuestion')}
    </button>
  );
};

export default QuestionToSpeech;
