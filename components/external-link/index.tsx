import IconHyperlink from 'icons/hyperlink.svg';
import React from 'react';

const ExternalLink: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = ({ children, ...restProps }) => {
  return (
    <a
      className="block text-lg text-white bg-white hover:text-brand-highlight hover:underline bg-opacity-[0.05] rounded px-4 py-2 hover:bg-opacity-10 focus-default flex items-center justify-between"
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
