import Typography from '@mui/joy/Typography'

import {Ranking} from 'board-game-data'

import styles from './RankingFull.module.scss'

interface RankingFullProps extends Ranking {
  className?: string,
}

export function RankingFull({
  name,
  datePublished,
  className = '',
}: RankingFullProps) {
  return (
    <div className={styles.container}>
      <Typography className={className + ' ' + styles.name}>
        {name}, published {datePublished}
      </Typography>
    </div>
  )
}

export default RankingFull;
