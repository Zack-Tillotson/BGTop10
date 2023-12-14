import Typography from '@mui/joy/Typography'

import {Ranking} from 'board-game-data'

import styles from './RankingBrief.module.scss'

interface RankingProps extends Ranking {
  className?: string,
}

export function RankingBrief({
  name,
  datePublished,
  creator,
  className = '',
}: RankingProps) {
  return (
    <div className={styles.container}>
      <Typography level="h3" className={className + ' ' + styles.name}>
        {name}
      </Typography>
      <Typography className={styles.details}><b>{creator}</b>, published {datePublished}</Typography>
    </div>
  )
}

export default RankingBrief;
