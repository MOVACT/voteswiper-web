import {
  IconAdjustmentsHorizontal,
  IconBoxMultiple,
  IconChartBar,
  IconGitCompare,
  IconPolaroid,
} from '@tabler/icons';
import cn from 'classnames';
import { calculateResult, useElection } from 'contexts/election';
import React from 'react';
import { STEPS } from '../constants';
import ResultItem from './item';
import styles from './result-menu.module.css';

const ResultMenu: React.FC = () => {
  const { questions, answers, parties, election } = useElection();
  const result = calculateResult(questions, answers, parties);

  const queryString =
    result.scores
      .map((party) => {
        return (
          'score[]=' + encodeURIComponent(`${party.name},${party.percentage}`)
        );
      })
      .join('&') +
    '&election=' +
    encodeURIComponent(election.name);

  return (
    <div
      className={cn(
        styles.menu,
        'grid grid-flow-col gap-3 pb-6 lg:pb-12 overflow-x-auto overflow-y-hidden -mx-6 px-6'
      )}
    >
      <ResultItem
        icon={IconChartBar}
        label="WahlSwiper-Ergebnis"
        screen={STEPS.RESULT}
        iconClassName="transform rotate-90"
      />

      <ResultItem
        icon={IconBoxMultiple}
        label="Parteien-Auswahl"
        screen={STEPS.EDIT_PARTIES}
      />

      <ResultItem
        icon={IconAdjustmentsHorizontal}
        label="Antworten ändern"
        screen={STEPS.EDIT_ANSWERS}
      />

      <ResultItem
        icon={IconGitCompare}
        label="Parteien-Vergleich"
        screen={STEPS.COMPARE_PARTY}
      />

      <ResultItem
        icon={IconPolaroid}
        label="Ergebnis als Bild"
        href={`https://share.voteswiper.org/api/share-image?${queryString}`}
      />

      <div className="w-4 lg:hidden" />
    </div>
  );
};

export default ResultMenu;
