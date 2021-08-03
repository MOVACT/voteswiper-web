import cn from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  items: {
    href: string;
    title: string;
  }[];
  className?: string;
}

const SidebarMenu: React.FC<Props> = ({ items, className }) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      {items.map((menuItem) => {
        return (
          <Link key={menuItem.href} href={menuItem.href} passHref>
            <a
              className={cn(
                'block bg-white rounded-lg px-4 py-3 leading-0 font-medium text-white focus-default',
                router.pathname === menuItem.href ||
                  (router.pathname.indexOf(menuItem.href) > -1 &&
                    menuItem.href === '/page/press/releases')
                  ? 'bg-opacity-20'
                  : 'bg-opacity-0 hover:bg-opacity-10'
              )}
            >
              {t(menuItem.title)}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
