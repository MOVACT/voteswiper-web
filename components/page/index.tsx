import React from 'react';
import cn from 'classnames';

interface IPageProps {
  className?: string;
}

const Page: React.FC<IPageProps> = ({ className, children }) => {
  return <main className={cn('py-4 md:py-12', className)}>{children}</main>;
};

export default Page;
