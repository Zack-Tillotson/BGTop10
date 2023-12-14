import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

import {Game} from 'board-game-data'

import styles from './GameBrief.module.scss'

interface GameBriefProps extends Partial<Game> {
  className?: string,
}

export function GameBrief({
  name,
  yearPublished,
  publisher = [],
  className = '',
}: GameBriefProps) {
  return (
    <div className={className}>
      <Typography level="body-lg" className={styles.name}>{name}</Typography>
      <Typography level="body-md" className={styles.details}>{publisher[0]} - published {yearPublished}</Typography>
    </div>
  )
}

export default GameBrief;
