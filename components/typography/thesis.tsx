import cn from 'classnames';
import React from 'react';

interface Props {
  customColorClassName?: string;
}

const Thesis: React.FC<Props> = ({ children, customColorClassName }) => {
  return (
    <div
      className={cn(
        'font-medium leading-5 lg:leading-6 lg:text-lg',
        customColorClassName ?? 'text-brand-dark-blue'
      )}
    >
      {children}
    </div>
  );
};

export default Thesis;
