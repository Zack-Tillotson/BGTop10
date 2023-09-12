import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

import {Game} from 'board-game-data'

import styles from './GameSummary.module.scss'

export function GameSummary({
  name,
  description,
  year,
  designer,
  publisher,
  playerMin,
  playerMax,
  imgSrc,
  imgAlt,
}: Game) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imgSrc} alt={imgAlt} className={styles.image} />
      </div>
      <div className={styles.primaryAttrs}>
        <Typography level="h3">{name}</Typography>
        <Typography>({year})</Typography>
      </div>
      <Card variant="outlined" className={styles.secondaryAttrs}>
        <Typography>Players: {playerMin} - {playerMax}</Typography>
        <Typography>Designer: {designer}</Typography>
        <Typography>Publisher: {publisher}</Typography>
      </Card>
      <Typography className={styles.description}>{description}</Typography>
    </div>
  )
}

export default GameSummary;
