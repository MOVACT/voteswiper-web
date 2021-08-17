import cn from 'classnames';
import WahlSwiperLogo from 'icons/wahlswiper_logo.svg';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useWindowScroll } from 'react-use';
import Container from '../container';
import styles from './header.module.css';

const HEADER_THRESHOLD = 30;

const EmbedHeader: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { y } = useWindowScroll();
  const { t } = useTranslation('header');

  React.useEffect(() => {
    if (y > HEADER_THRESHOLD && scrolled === false) {
      setScrolled(true);
    } else if (y <= HEADER_THRESHOLD && scrolled === true) {
      setScrolled(false);
    }
  }, [y, scrolled]);

  return (
    <>
      <header
        className={cn(
          styles.header,
          'fixed z-50 w-screen flex items-center transition-all print:hidden border-b border-black border-opacity-10 lg:border-0',
          scrolled
            ? 'h-16 bg-brand-primary duration-500'
            : 'h-16 lg:h-32 lg:pt-12 duration-200 bg-brand-primary lg:bg-transparent',
          scrolled && styles.scrolled
        )}
      >
        <Container className="flex items-center">
          <div className="flex items-center text-base font-normal text-white rounded lg:text-3xl focus-default">
            <WahlSwiperLogo className="w-auto h-5 mie-2 lg:h-8 lg:mie-3" />
            {t('common:name')}
          </div>
        </Container>
      </header>
    </>
  );
};

export default EmbedHeader;
