import cn from 'classnames';
import IconHome from 'icons/home.svg';
import { BreadcrumbJsonLd } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import url from 'util/url';
import Container from '../layout/container';
import styles from './page-header.module.css';

interface Props {
  title: string;
  breadcrumb?: {
    name: string;
    item: string;
  }[];
}

const PageHeader: React.FC<Props> = ({ title, breadcrumb }) => {
  const router = useRouter();
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
    <header className="pb-4 bg-black bg-opacity-20 pt-28 md:pt-48 md:pb-8">
      {breadcrumb && router.pathname.indexOf('embed') === -1 && (
        <BreadcrumbJsonLd itemListElements={breadcrumbArray} />
      )}
      <Container>
        {breadcrumb && router.pathname.indexOf('embed') === -1 && (
          <nav className="mb-1 md:mb-2">
            <ol
              className={cn(
                styles.breadcrumb,
                'flex flex-wrap text-sm text-white leading-5'
              )}
            >
              <li className="flex items-center">
                <Link href="/" passHref>
                  <a className="flex items-center text-white rounded hover:opacity-75 focus-default">
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
                        <a className="flex items-center text-white rounded hover:opacity-75 focus-default">
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
        <h1 className="text-3xl font-medium text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
      </Container>
    </header>
  );
};

export default PageHeader;
