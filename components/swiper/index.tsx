import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface Props {
  open: boolean;
}

const Swiper: React.FC<Props> = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#7577bd] to-[#392f52] z-50 overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          hello
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Swiper;
