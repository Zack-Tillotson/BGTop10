import Typography from '@mui/joy/Typography'

import {Creator} from 'board-game-data'

import styles from './CreatorBrief.module.scss'

interface CreatorProps extends Creator {
  className?: string,
}

export function CreatorBrief({
  name,
  className = '',
}: CreatorProps) {
  return (
    <Typography className={className}>
      {name}
    </Typography>
  )
}

export default CreatorBrief;
