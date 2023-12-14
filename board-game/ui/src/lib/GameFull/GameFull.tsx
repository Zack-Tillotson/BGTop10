import Typography from '@mui/joy/Typography'
import { Card, Table } from '@mui/joy'

import {Game} from 'board-game-data'

import styles from './GameFull.module.scss'

function renderDetailArray(stringArray: string[] = [], maxCount: number, isBrief: boolean) {
  const items = stringArray.slice(0, isBrief ? maxCount : 999)
  if(isBrief && stringArray.length > maxCount) {
    items.push(` + ${stringArray.length - maxCount} more`)
  }
  return items.map(item => <div key={item} className={styles.detailValue}>{item}</div>)
}

export interface GameFullProps extends Game {
  isBrief?: boolean,
  extraTitle?: string,
}

export function GameFull({
  isBrief = true,
  extraTitle,
  yearPublished,
  description,
  designer,
  publisher,
  artist,
  bggId,
  playerCountMin,
  playerCountMax,
  image,
  mechanic,
}: GameFullProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt={`The game's poster`} className={styles.image} />
      </div>
      {extraTitle && (
        <div className={styles.extraTitle}>
          <Typography>{extraTitle}</Typography>
        </div>
      )}
      <section className={styles.details}>
        <div>
          <a 
            href={`https://boardgamegeek.com/boardgame/${bggId}`} 
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Board Game Geek
          </a>
        </div>
        <Typography level="h2">Details</Typography>
        <dl className={styles.detailTable}>
          <dt>Publisher</dt>
          <dd>{renderDetailArray(publisher, 1, isBrief)}</dd>

          <dt>Year published</dt>
          <dd>{yearPublished}</dd>

          <dt>Designer</dt>
          <dd>{renderDetailArray(designer, 3, isBrief)}</dd>
              
          <dt>Player count</dt>
          <dd>
            {playerCountMin}
            {playerCountMin !== playerCountMax && ` - ${playerCountMax}`}
          </dd>
              
          <dt>Artists</dt>
          <dd>{renderDetailArray(artist, 2, isBrief)}</dd>

          <dt>Mechanics</dt>
          <dd>{renderDetailArray(mechanic, 4, isBrief)}</dd>
        </dl>
      </section>
            
      <Typography className={styles.description}>{description}</Typography>
    </div>
  )
}

export default GameFull;
