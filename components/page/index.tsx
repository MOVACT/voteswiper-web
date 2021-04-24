import cn from 'classnames';
import React from 'react';

interface Props {
  className?: string;
}

const Page: React.FC<Props> = ({ className, children }) => {
  return <main className={cn('py-6 md:py-12', className)}>{children}</main>;
};

export default Page;
