import {
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const SWIPE_THRESHOLD = 250;

const Swiper: NextPage = () => {
  const { t } = useTranslation('error');

  const [constrained, setConstrained] = React.useState<boolean>(true);

  const x = useMotionValue(0);
  const input = [SWIPE_THRESHOLD * -1, 0, SWIPE_THRESHOLD];

  // Interpolate Rotation
  const rotateOutput = [-5, 0, 5];
  const rotate = useTransform(x, input, rotateOutput);

  const controls = useAnimation();

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
      }
    },
    [controls]
  );

  return (
    <div className="flex items-center justify-center w-screen min-h-screen overflow-hidden">
      <div className="max-w-xs w-full h-[450px] relative">
        <motion.div
          className="absolute w-full h-full"
          animate={controls}
          dragElastic={1}
          drag
          style={{ x, rotate }}
          onDragEnd={onDragEnd}
          dragConstraints={
            constrained && { left: 0, right: 0, top: 0, bottom: 0 }
          }
        >
          <div className="h-full bg-white rounded-lg shadow">hello</div>

          {/*<div className="absolute top-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white bg-red-500 rounded-lg bg-opacity-90">
            Nein
          </div>*/}
        </motion.div>
      </div>
    </div>
  );
};

export default Swiper;
