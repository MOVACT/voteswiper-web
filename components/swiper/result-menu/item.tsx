import { TablerIcon } from '@tabler/icons';
import cn from 'classnames';
import { useElection } from 'contexts/election';
import React from 'react';
import { STEPS } from '../constants';

interface Props {
  iconClassName?: string;
  label: string;
  icon: TablerIcon;
  screen?: STEPS;
  href?: string;
  disabled?: boolean;
}

const ResultItem: React.FC<Props> = ({
  iconClassName,
  label,
  icon,
  screen,
  href,
  disabled = false,
}) => {
  const { screen: currentScreen, goToScreen } = useElection();
  const IconComponent = icon;

  const className = cn(
    'flex flex-col items-center focus-default justify-center w-full p-4 font-medium text-center text-white border border-white rounded-lg text-sm lg:text-base leading-tight',
    currentScreen === screen
      ? 'bg-opacity-100 text-brand-highlight'
      : 'border-opacity-20 hover:border-opacity-100 text-white'
  );

  const content = (
    <>
      <IconComponent className={cn('h-10', iconClassName)} />
      <div className="flex items-start flex-1">{label}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(className, disabled && 'opacity-50 pointer-events-none')}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={className}
      onClick={() => {
        goToScreen(screen ?? STEPS.RESULT);
      }}
    >
      {content}
    </button>
  );
};

export default ResultItem;
