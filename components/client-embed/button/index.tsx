import cn from 'classnames';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
import React from 'react';
import styles from './button.module.css';

interface Props {
  href?: string;
  className?: string;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  color?: 'default' | 'outline' | 'white' | 'outlineDark' | 'primary' | 'nav';
  size?: 'default' | 'lg' | 'sm' | 'blank';
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  href,
  children,
  className,
  color = 'default',
  size = 'default',
  target,
  rel,
  disabled = false,
  ...restProps
}) => {
  const props = {
    ...restProps,
    className: cn(
      'focus-default inline-block cursor-pointer font-medium text-white',
      // Sizes
      size === 'default' && 'text-sm py-2.5 px-4 rounded-lg',
      size === 'lg' && 'text-base lg:text-lg py-4 px-6 rounded-xl',
      size === 'sm' && 'text-sm lg:text-base py-2 px-3 rounded-lg',
      // Colors
      color === 'default' && styles.default,
      color === 'outline' &&
        'ring-1 ring-inset ring-opacity-20 hover:ring-opacity-40 ring-white',
      color === 'outlineDark' &&
        'text-brand-primary bg-transparent ring-1 ring-inset ring-brand-primary ring-opacity-20 hover:ring-opacity-40',
      color === 'primary' && clientEmbedStyles.accentButton,
      color === 'nav' && clientEmbedStyles.navButton,
      disabled && 'opacity-75 text-opacity-75',
      className
    ),
  };

  if (href) {
    return (
      <a {...props} href={href} rel={rel} target={target}>
        {children}
      </a>
    );
  }
  return (
    <button {...props} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
