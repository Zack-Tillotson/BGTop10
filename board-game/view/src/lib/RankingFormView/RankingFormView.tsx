import Link from 'next/link';

import styles from './RankingFormView.module.scss';

import { takeRanking } from 'board-game-data';
import RankingFormClient from './RankingFormClient';

interface RankingFormViewProps {
  slug?: string,
}

export async function RankingFormView({slug}: RankingFormViewProps) {
  const ranking = await takeRanking(slug)
  return (
    <RankingFormClient ranking={ranking} />
  );
}
