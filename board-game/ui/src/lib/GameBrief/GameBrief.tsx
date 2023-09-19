import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

import {Game} from 'board-game-data'

import styles from './GameBrief.module.scss'

export function GameBrief({
  name,
  yearPublished,
}: Game) {
  return (
    <Typography>
      {name}
    </Typography>
  )
}

export default GameBrief;
