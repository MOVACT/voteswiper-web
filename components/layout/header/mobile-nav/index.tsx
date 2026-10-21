import { AnimatePresence, motion, Variants } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useLockBodyScroll } from 'react-use';
import navItems from '../data';

const MotionLink = motion.create(Link);

interface Props {
  open: boolean;
  setNav: (showNavigation: boolean) => void;
}
const MobileNav: React.FC<Props> = ({ open, setNav }) => {
  useLockBodyScroll(open);
  const { t } = useTranslation();

  const itemVariants: Variants = {
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const parentVariants: Variants = {
    enter: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
    exit: {
      transition: {
        delayChildren: 0,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const renderNavItem = (item: {
    href: string;
    text: string;
  }): React.ReactElement => {
    return (
      <li className="py-2" key={item.text}>
        <MotionLink
          href={t(item.href)}
          key={item.text}
          variants={itemVariants}
          onClick={() => {
            setNav(false);
          }}
          className={'text-xl text-white font-medium rounded focus-default'}
        >
          {t(item.text)}
        </MotionLink>
      </li>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="lg:hidden">
          <motion.div
            initial={{
              scaleY: 0,
              transformOrigin: 'top',
            }}
            animate={{
              scaleY: 1,
              transition: {
                duration: 1.5,
                ease: 'easeInOut',
              },
            }}
            exit={{
              scaleY: 0,
              transition: {
                duration: 1.5,
                ease: 'easeInOut',
              },
            }}
            className="fixed top-0 left-0 z-30 w-screen h-full bg-brand-primary bg-opacity-80"
          />

          <motion.div
            className={
              'fixed top-0 left-0 w-screen h-full z-40 overflow-auto flex items-center py-10 px-4 sm:px-6'
            }
            variants={parentVariants}
            initial={'exit'}
            animate={'enter'}
            exit={'exit'}
          >
            <ul>{navItems.map((item) => renderNavItem(item))}</ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
