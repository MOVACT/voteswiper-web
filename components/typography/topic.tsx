import cn from 'classnames';
import React from 'react';
interface Props {
  customColorClassName?: string;
}

const Topic: React.FC<Props> = ({ children, customColorClassName }) => {
  return (
    <div
      className={cn(
        'pb-2 text-xs font-medium tracking-widest uppercase',
        customColorClassName ?? 'text-brand-primary'
      )}
    >
      {children}
    </div>
  );
};

export default Topic;
