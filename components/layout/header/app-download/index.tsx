import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const AppDownload: React.FC = () => {
  const { t } = useTranslation('header');
  return (
    <Menu as="div" className="relative inline-block ml-auto text-left lg:mis-2">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full py-2.5 px-4 rounded-lg bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-black text-sm font-medium text-white hover:from-[rgba(0,0,0,0.5)] focus-default">
              <span className="lg:hidden">{t('app')}</span>
              <span className="hidden lg:inline">{t('download')}</span>
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
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="https://itunes.apple.com/us/app/wahlswiper/id1231104532?mt=8"
                      rel="noopener noreferrer"
                      title="App für iPhone / iPad herunterladen"
                      target="_blank"
                      role="button"
                      className={cn(
                        'block rounded-md font-medium items-center w-full px-2 py-2 text-sm hover:bg-opacity-100 hover:bg-brand-primary hover:text-white',
                        active
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-dark-blue'
                      )}
                    >
                      iPhone / iPad
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="https://play.google.com/store/apps/details?id=com.wahlswiper"
                      rel="noopener noreferrer"
                      title="App für Android Phones und Tablets herunterladen"
                      target="_blank"
                      role="button"
                      className={cn(
                        'block rounded-md font-medium items-center w-full px-2 py-2 text-sm hover:bg-opacity-100 hover:bg-brand-primary hover:text-white',
                        active
                          ? 'bg-brand-primary text-white'
                          : 'text-brand-dark-blue'
                      )}
                    >
                      Android
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default AppDownload;
