import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

import {Game} from 'board-game-data'

import styles from './GameSummary.module.scss'

export function GameSummary({
  name,
  description,
  yearPublished,
  designer,
  publisher,
  playerCountMin,
  playerCountMax,
  imageThumbnail,
}: Game) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageThumbnail} alt={name} className={styles.image} />
      </div>
      <div className={styles.primaryAttrs}>
        <Typography level="h3">{name}</Typography>
        <Typography>({yearPublished})</Typography>
      </div>
      <Card variant="outlined" className={styles.secondaryAttrs}>
        <Typography>Players: {playerCountMin} - {playerCountMax}</Typography>
        <Typography>Designer: {designer.slice(0, 1)}</Typography>
        <Typography>Publisher: {publisher.slice(0, 1)}</Typography>
      </Card>
      <Typography className={styles.description}>{description}</Typography>
    </div>
  )
}

export default GameSummary;
