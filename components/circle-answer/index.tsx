import { ANSWERS } from 'components/swiper/constants';
import { SwiperAnswer } from 'contexts/election';
import IconCheckmark from 'icons/checkmark.svg';
import IconCross from 'icons/cross.svg';
import IconNeutral from 'icons/neutral.svg';
import React from 'react';
import { Answer } from 'types/api';

interface Props {
  answer?: SwiperAnswer | Answer;
}

const CircleAnswer: React.FC<Props> = ({ answer }) => {
  if (!answer || answer.answer === ANSWERS.NONE) {
    return (
      <div className="flex items-center justify-center w-5 h-5 text-white rounded-full bg-gradient-to-b from-gray-300 to-gray-400">
        <IconNeutral className="w-4 h-4" />
      </div>
    );
  }

  if (answer.answer === ANSWERS.YES) {
    return (
      <div className="flex items-center justify-center w-5 h-5 text-white rounded-full bg-gradient-to-b from-green-vibrant-500 to-green-vibrant-600">
        <IconCheckmark className="w-4 h-4" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-5 h-5 text-white rounded-full bg-gradient-to-b from-red-500 to-red-700">
      <IconCross className="w-4 h-4" />
    </div>
  );
};

export default CircleAnswer;
