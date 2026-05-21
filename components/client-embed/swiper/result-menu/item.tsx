import { TablerIcon } from '@tabler/icons';
import cn from 'classnames';
import clientEmbedStyles from 'components/client-embed/client-embed.module.scss';
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
  visible?: boolean;
}

const ResultItem: React.FC<Props> = ({
  iconClassName,
  label,
  icon,
  screen,
  href,
  disabled = false,
  visible = true,
}) => {
  const { screen: currentScreen, goToScreen } = useElection();
  const IconComponent = icon;

  const className = cn(
    'flex flex-col items-center focus-default justify-center w-full rounded-lg border border-white p-4 text-center text-sm font-medium leading-tight lg:text-base',
    currentScreen === screen
      ? clientEmbedStyles.resultMenuItemActive
      : 'border-opacity-20 text-white text-opacity-70 hover:border-opacity-100 hover:text-white'
  );

  const content = (
    <>
      <IconComponent className={cn('h-10', iconClassName)} />
      <div className="flex items-start flex-1">{label}</div>
    </>
  );

  if (!visible) return <></>;

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
