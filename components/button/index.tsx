import React from 'react';
import cn from 'classnames';
import styles from './button.module.css';

interface IButtonProps {
  href?: string;
  className?: string;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  color?: 'default' | 'outline' | 'white' | 'outlineDark';
}

const Button: React.FC<IButtonProps> = ({
  href,
  children,
  className,
  color = 'default',
  ...restProps
}) => {
  const props = {
    ...restProps,
    className: cn(
      'focus-default inline-block text-sm cursor-pointer font-medium text-white py-2.5 px-4 rounded-lg',
      color === 'default' && styles.default,
      color === 'outline' &&
        'ring-1 ring-inset ring-opacity-20 hover:ring-opacity-40 ring-white',
      color === 'outlineDark' &&
        'text-brand-primary bg-transparent ring-1 ring-inset ring-brand-primary ring-opacity-20 hover:ring-opacity-40',
      className
    ),
  };

  if (href) {
    return <a {...props}>{children}</a>;
  }
  return <button {...props}>{children}</button>;
};

export default Button;
