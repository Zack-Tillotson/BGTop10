import { Typography } from '@mui/joy';
import Link from 'next/link';

import { takeRankings} from 'board-game-data' 
import { RankingBrief } from 'board-game-ui';

import styles from './RankingList.module.scss'

export async function RankingList() {
  const list = await takeRankings({orderBy: ['datePublished', 'desc'], maxCount: -1})

  return (
    <section>
      <Typography level="h2">List of rankings ({list.length} total)</Typography>
      <ul className={styles.container}>
        {list.map((ranking) => (
          <li key={ranking.id} className={styles.li}>
            <Link href={`/ranking/${ranking.slug}`}>
              <RankingBrief {...ranking} className={styles.item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RankingList;
