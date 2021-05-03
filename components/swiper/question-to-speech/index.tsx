import { useElection } from 'contexts/election';
import IconVolume from 'icons/volume.svg';
import { useRouter } from 'next/router';
import React from 'react';

const QuestionToSpeech: React.FC = () => {
  const [isApiAvailable, setApiAvailable] = React.useState(true);
  const { currentQuestion, questions } = useElection();
  const { locale } = useRouter();

  const question = questions[currentQuestion];

  React.useEffect(() => {
    if (typeof speechSynthesis === 'undefined') {
      setApiAvailable(false);
    }
  }, []);

  const read = React.useCallback(() => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = question.question;
    msg.lang = locale || 'en';

    speechSynthesis.speak(msg);
  }, [locale, question]);

  if (!isApiAvailable) return <></>;

  return (
    <button
      onClick={read}
      className="flex items-center text-sm font-medium text-white rounded lg:text-lg hover:underline hover:text-brand-highlight text-underline-offset-2 focus-default"
    >
      <IconVolume className="w-auto h-6 mr-2" />
      Frage vorlesen
    </button>
  );
};

export default QuestionToSpeech;
