import url from 'util/url';
import cn from 'classnames';
import { BreadcrumbJsonLd } from 'next-seo';
import React from 'react';
import Container from '../layout/container';
import styles from './page-header.module.css';
import IconHome from 'icons/home.svg';
import Link from 'next/link';

interface IPageHeaderProps {
  title: string;
  breadcrumb?: {
    name: string;
    item: string;
  }[];
}

const PageHeader: React.FC<IPageHeaderProps> = ({ title, breadcrumb }) => {
  const breadcrumbArray = [
    {
      position: 1,
      name: 'Home',
      item: url('/', true),
    },
    ...(breadcrumb || []).map((entry, index) => {
      return {
        position: index + 2,
        name: entry.name,
        item: url(entry.item, true),
      };
    }),
  ];

  return (
    <header className="bg-black bg-opacity-20 pt-28 md:pt-48 pb-4 md:pb-8">
      {breadcrumb && <BreadcrumbJsonLd itemListElements={breadcrumbArray} />}
      <Container>
        {breadcrumb && (
          <nav className="mb-1 md:mb-2">
            <ol
              className={cn(
                styles.breadcrumb,
                'flex text-sm text-white leading-5'
              )}
            >
              <li className="flex items-center">
                <Link href="/" passHref>
                  <a className="text-white flex items-center hover:opacity-75 rounded focus-default">
                    <IconHome className="w-3 h-3 transform -translate-y-px" />
                    <span className="sr-only">Home</span>
                  </a>
                </Link>
              </li>
              {breadcrumb.map((entry, index) => {
                return (
                  <li key={entry.item} className="flex items-center">
                    {breadcrumb.length === index + 1 ? (
                      <span className="opacity-75">{entry.name}</span>
                    ) : (
                      <Link href={entry.item} passHref>
                        <a className="text-white flex items-center hover:opacity-75 rounded focus-default">
                          {entry.name}
                        </a>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <h1 className="text-white font-medium text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
      </Container>
    </header>
  );
};

export default PageHeader;
