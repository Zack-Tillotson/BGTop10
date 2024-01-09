import Typography from '@mui/joy/Typography'

import {Game} from 'board-game-data'
import { GameImage } from '../GameImage'

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
  imageSrcSet,
  mechanic,
}: GameFullProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <GameImage
          src={image}
          className={styles.image} 
          srcSet={imageSrcSet}
          sizes="(max-width: 500px) 550px, 750px"
        />
      </div>
      {extraTitle && (
        <div className={styles.extraTitle}>
          <Typography>{extraTitle}</Typography>
        </div>
      )}
      <section className={styles.details}>
        <Typography level="h2" className={styles.detailsTitle}>Details</Typography>
        <dl className={styles.detailTable}>
          <dt>Year published</dt>
          <dd>{yearPublished}</dd>

          <dt>Designer</dt>
          <dd>{renderDetailArray(designer, 3, isBrief)}</dd>
    
          <dt>Artists</dt>
          <dd>{renderDetailArray(artist, 2, isBrief)}</dd>

          <dt>Player count</dt>
          <dd>
            {playerCountMin}
            {playerCountMin !== playerCountMax && ` - ${playerCountMax}`}
          </dd>

          <dt>Publisher</dt>
          <dd>{renderDetailArray(publisher, 1, isBrief)}</dd>

          <dt>Mechanics</dt>
          <dd>{renderDetailArray(mechanic, 4, isBrief)}</dd>
        </dl>
      </section>

      <section className={styles.link}>
        <Typography level="h2">More information</Typography>
        <a 
          href={`https://boardgamegeek.com/boardgame/${bggId}`} 
          target="_blank"
          rel="noreferrer"
          className={styles.linkAnchor}
        >
          Board Game Geek <span className={styles.externalLinkIcon}>↗</span>
        </a>
      </section>
            
      <Typography className={styles.description}>{description}</Typography>
    </div>
  )
}

export default GameFull;
