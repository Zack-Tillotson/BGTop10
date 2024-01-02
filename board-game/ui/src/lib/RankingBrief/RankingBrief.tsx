import Typography from '@mui/joy/Typography'

import {Ranking} from 'board-game-data'

import styles from './RankingBrief.module.scss'
import { CreatorBrief } from '../CreatorBrief';

interface RankingProps extends Ranking {
  className?: string,
  isExternalLink?: boolean,
}

export function RankingBrief({
  name,
  datePublished,
  creatorObj,
  link,
  className = '',
  isExternalLink = false,
}: RankingProps) {
  return (
    <div className={className + ' ' + styles.container}>
      <Typography level="h3" className={styles.name}>
        {name}
      </Typography>
      <Typography level="body-md" className={styles.date}>
        Published: {datePublished}
      </Typography>
      {!!creatorObj && (
        <CreatorBrief {...creatorObj} className={styles.creator} />
      )}
      {isExternalLink && (
        <a 
          href={link} 
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <span className={styles.linkInner}>
            View on YouTube
          </span>
        </a>
      )}
    </div>
  )
}

export default RankingBrief;
