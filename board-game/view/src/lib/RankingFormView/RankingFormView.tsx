import Link from 'next/link';

import styles from './RankingFormView.module.scss';

import { takeCreators, takeRanking, takeTags } from 'board-game-data';
import RankingFormClient from './RankingFormClient';

interface RankingFormViewProps {
  slug?: string,
}

export async function RankingFormView({slug}: RankingFormViewProps) {
  const ranking = await takeRanking(slug)
  const tags = await takeTags(false, {orderBy: ['priority', 'desc']})
  const creators = await takeCreators()

  return (
    <RankingFormClient ranking={ranking} tags={tags} creators={creators} />
  );
}