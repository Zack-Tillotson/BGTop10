import Typography from '@mui/joy/Typography'

import {Ranking} from 'board-game-data'

import styles from './RankingBrief.module.scss'

interface RankingProps extends Ranking {
  className?: string,
}

export function RankingBrief({
  name,
  datePublished,
  className = '',
}: RankingProps) {
  return (
    <div className={styles.container}>
      <Typography className={className + ' ' + styles.name}>
        {name}, published {datePublished}
      </Typography>
    </div>
  )
}

export default RankingBrief;
