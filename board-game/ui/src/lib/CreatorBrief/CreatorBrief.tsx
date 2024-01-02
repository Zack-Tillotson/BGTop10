import Typography from '@mui/joy/Typography'

import {Creator} from 'board-game-data'

import styles from './CreatorBrief.module.scss'

interface CreatorProps extends Creator {
  className?: string,
}

export function CreatorBrief({
  name,
  imageAvatar,
  className = '',
}: CreatorProps) {
  return (
    <div className={className + ' ' + styles.container}>
      <img width={35} height={35} className={styles.image} src={imageAvatar} alt={`YouTube channel avatar`} />
      <Typography className={styles.name}>
        {name}
      </Typography>
    </div>
  )
}

export default CreatorBrief;
