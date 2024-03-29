import cn from 'classnames';
import IconClose from 'icons/close.svg';
import IconToggle from 'icons/navigation.svg';
import WahlSwiperLogo from 'icons/wahlswiper_logo.svg';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useWindowScroll } from 'react-use';
import Container from '../container';
import AppDownload from './app-download';
import navItems from './data';
import styles from './header.module.css';
import LanguageSwitcher from './language-switcher';
import MobileNav from './mobile-nav';

const HEADER_THRESHOLD = 30;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileNavOpened, setMobileNavVisibility] = React.useState(false);
  const { locale } = useRouter();
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
          <button
            aria-label={t('toggle')}
            onClick={() => {
              setMobileNavVisibility(!mobileNavOpened);
            }}
            className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg ring-1 ring-inset ring-opacity-20 hover:ring-opacity-40 ring-white lg:hidden focus-default"
          >
            {mobileNavOpened ? (
              <IconClose className="w-auto h-5 text-white" />
            ) : (
              <IconToggle className="w-auto h-5 text-white" />
            )}
          </button>
          <Link passHref href="/">
            <a className="flex items-center text-base font-normal text-white rounded lg:text-3xl focus-default">
              <WahlSwiperLogo className="w-auto h-5 mie-2 lg:h-8 lg:mie-3" />
              {t('common:name')}
            </a>
          </Link>

          <div className="items-center justify-between flex-1 hidden pis-8 lg:flex">
            <nav>
              <ul className="flex">
                {navItems.map((item) => {
                  if (
                    item.locales &&
                    item.locales.indexOf(locale || 'de') === -1
                  )
                    return <React.Fragment key={item.text}></React.Fragment>;

                  return (
                    <li className="px-3" key={item.text}>
                      <Link href={t(item.href)} passHref>
                        <a
                          className={cn(
                            styles.link,
                            'font-medium inline-block text-white relative cursor-pointer rounded focus-default'
                          )}
                        >
                          {t(item.text)}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <LanguageSwitcher />
          </div>
          <AppDownload />
        </Container>
      </header>
      <MobileNav open={mobileNavOpened} setNav={setMobileNavVisibility} />
    </>
  );
};

export default Header;
