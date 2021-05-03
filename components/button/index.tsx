import cn from 'classnames';
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
  color?: 'default' | 'outline' | 'white' | 'outlineDark' | 'primary';
  size?: 'default' | 'lg';
  target?: string;
  rel?: string;
}

const Button: React.FC<Props> = ({
  href,
  children,
  className,
  color = 'default',
  size = 'default',
  target,
  rel,
  ...restProps
}) => {
  const props = {
    ...restProps,
    className: cn(
      'focus-default inline-block cursor-pointer font-medium text-white',
      // Sizes
      size === 'default' && 'text-sm py-2.5 px-4 rounded-lg',
      size === 'lg' && 'text-base lg:text-lg py-4 px-6 rounded-xl',
      // Colors
      color === 'default' && styles.default,
      color === 'outline' &&
        'ring-1 ring-inset ring-opacity-20 hover:ring-opacity-40 ring-white',
      color === 'outlineDark' &&
        'text-brand-primary bg-transparent ring-1 ring-inset ring-brand-primary ring-opacity-20 hover:ring-opacity-40',
      color === 'primary' &&
        'bg-gradient-to-b from-[#db67ae] to-[#8186d7] shadow-xl hover:shadow-sm transform hover:scale-[0.99] transition-transform',
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
  return <button {...props}>{children}</button>;
};

export default Button;
