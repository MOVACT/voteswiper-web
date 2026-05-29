import cn from 'classnames';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import { ANSWERS } from 'components/client-embed/swiper/constants';
import { SwiperAnswer } from 'contexts/election';
import IconCheckmark from 'icons/checkmark.svg';
import IconCross from 'icons/cross.svg';
import IconNeutral from 'icons/neutral.svg';
import React from 'react';
import { Answer } from 'types/api';

interface Props {
  answer?: SwiperAnswer | Answer;
}

const iconClass =
  'flex h-5 w-5 items-center justify-center rounded-full text-white';

const CircleAnswer: React.FC<Props> = ({ answer }) => {
  if (!answer || answer.answer === ANSWERS.NONE) {
    return (
      <div className={cn(iconClass, clientEmbedStyles.answerIconNeutral)}>
        <IconNeutral className="h-4 w-4" />
      </div>
    );
  }

  if (answer.answer === ANSWERS.YES) {
    return (
      <div className={cn(iconClass, clientEmbedStyles.answerIconYes)}>
        <IconCheckmark className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className={cn(iconClass, clientEmbedStyles.answerIconNo)}>
      <IconCross className="h-4 w-4" />
    </div>
  );
};

export default CircleAnswer;
