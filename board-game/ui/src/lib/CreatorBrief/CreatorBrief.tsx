import Typography from '@mui/joy/Typography'

import {Creator} from 'board-game-data'

import styles from './CreatorBrief.module.scss'

interface CreatorProps extends Creator {
  className?: string,
}

export function CreatorBrief({
  name,
  imageBanner,
  className = '',
}: CreatorProps) {
  return (
    <div className={styles.container} style={{backgroundImage: `url('${imageBanner}')`}}>
      <Typography className={className + ' ' + styles.name}>
        {name}
      </Typography>
    </div>
  )
}

export default CreatorBrief;
