import {
  IconAdjustmentsHorizontal,
  IconBoxMultiple,
  IconChartBar,
  IconGitCompare,
  IconPolaroid,
} from '@tabler/icons';
import cn from 'classnames';
import { calculateResult, useElection } from 'contexts/election';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { STEPS } from '../constants';
import ResultItem from './item';
import styles from './result-menu.module.css';

const ResultMenu: React.FC = () => {
  const { questions, answers, parties, election } = useElection();
  const result = calculateResult(questions, answers, parties);
  const { t } = useTranslation();

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
        label={t('election:voteswiperResult')}
        screen={STEPS.RESULT}
        iconClassName="transform rotate-90"
      />

      <ResultItem
        icon={IconBoxMultiple}
        label={t('election:partySelection')}
        screen={STEPS.EDIT_PARTIES}
      />

      <ResultItem
        icon={IconAdjustmentsHorizontal}
        label={t('election:changeAnswers')}
        screen={STEPS.EDIT_ANSWERS}
      />

      <ResultItem
        icon={IconGitCompare}
        label={t('election:compareParties')}
        screen={STEPS.COMPARE_PARTY}
      />

      <ResultItem
        icon={IconPolaroid}
        label={t('election:resultImage')}
        href={`https://share.voteswiper.org/api/share-image?${queryString}`}
      />

      <div className="w-4 lg:hidden" />
    </div>
  );
};

export default ResultMenu;
