import cn from 'classnames';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import React from 'react';

interface Props {
  customColorClassName?: string;
}

const Topic: React.FC<Props> = ({ children, customColorClassName }) => {
  return (
    <div
      className={cn(
        'pb-2 text-xs font-bold tracking-widest uppercase',
        customColorClassName ?? clientEmbedStyles.topic
      )}
    >
      {children}
    </div>
  );
};

export default Topic;
