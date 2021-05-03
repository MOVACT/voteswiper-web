import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import config from 'config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const LanguageSwitcher: React.FC = () => {
  const { locale, locales } = useRouter();

  const onLanguageChange = React.useCallback((newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; expires=Thu, 31 Dec 2100 12:00:00 UTC; path=/`;
  }, []);

  /**
   * Set cookie on keyboard navigation as well
   */
  const onKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLAnchorElement>, newLocale: string) => {
      switch (event.key) {
        case ' ': {
          return onLanguageChange(newLocale);
          break;
        }
      }
      return true;
    },
    [onLanguageChange]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white ring-1 ring-inset ring-opacity-20 hover:ring-opacity-40 ring-white focus-default">
              {locale && config.languageNames[locale]}
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="z-[60] absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="p-2 ">
                {locales?.map((loc, index) => {
                  return (
                    <Menu.Item key={loc}>
                      {({ active }) => (
                        <Link passHref href="/" locale={loc}>
                          <a
                            onClick={() => onLanguageChange(loc)}
                            role="button"
                            tabIndex={index}
                            onKeyPress={(e) => onKeyPress(e, loc)}
                            className={cn(
                              'block rounded-md font-medium items-center w-full px-2 py-2 text-sm hover:bg-opacity-100 hover:bg-brand-primary hover:text-white',
                              loc === locale &&
                                !active &&
                                'bg-brand-primary bg-opacity-10',
                              active
                                ? 'bg-brand-primary text-white'
                                : 'text-brand-dark-blue'
                            )}
                          >
                            {config.languageNames[loc]}
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default LanguageSwitcher;
