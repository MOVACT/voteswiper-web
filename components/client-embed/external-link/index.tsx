import cn from 'classnames';
import IconHyperlink from 'icons/hyperlink.svg';
import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  size?: 'sm' | 'default';
}

const ExternalLink: React.FC<Props> = ({
  children,
  className,
  size = 'default',
  ...restProps
}) => {
  return (
    <a
      className={cn(
        'block text-white bg-white hover:text-brand-highlight hover:underline bg-opacity-[0.05] rounded px-4 py-2 hover:bg-opacity-10 focus-default flex items-center justify-between',
        size === 'default' && 'text-lg',
        size === 'sm' && 'text-sm',
        className
      )}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...restProps}
    >
      {children}
      <IconHyperlink className="w-4 h-4 ml-2" />
    </a>
  );
};

export default ExternalLink;
