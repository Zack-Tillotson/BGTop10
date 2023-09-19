import Typography from '@mui/joy/Typography'
import { Card, Table } from '@mui/joy'

import {Game} from 'board-game-data'

import styles from './GameSummary.module.scss'

function getShortString(stringArray: string[] = [], maxCount: number) {
  return `${stringArray.slice(0, maxCount).join(', ')}${stringArray.length > maxCount ? ` + ${stringArray.length - maxCount} more` : ''}`
}

export interface GameSummaryProps extends Game {
  extraTitle?: string,
}

export function GameSummary({
  extraTitle,
  name,
  description,
  yearPublished,
  designer,
  publisher,
  artist,
  bggId,
  playerCountMin,
  playerCountMax,
  imageThumbnail,
}: GameSummaryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageThumbnail} alt={name} className={styles.image} />
      </div>
      <div className={styles.primaryAttrs}>
        <Typography level="h3" id={`game-${bggId}`}>
          {extraTitle && (
            <span className={styles.extraTitle}>{extraTitle}</span>
          )}
          {name}
        </Typography>
        <Typography className={styles.yearPublished}>({yearPublished})</Typography>
      </div>
      <Card className={styles.secondaryAttrs}>
        <Table className={styles.detailsTable} size="sm">
          <tbody>
            <tr>
              <th scope="row">Publisher</th>
              <td>{getShortString(publisher, 1)}</td>
            </tr>
            <tr>
              <th scope="row">Designer</th>
              <td>{getShortString(designer, 3)}</td>
            </tr>
            <tr>
              <th scope="row">Player count</th>
              <td>
                {playerCountMin}
                {playerCountMin !== playerCountMax && ` - ${playerCountMax}`}
              </td>
            </tr>
            <tr>
              <th scope="row">Artists</th>
              <td>
                {getShortString(artist, 2)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <Typography className={styles.description}>{description}</Typography>
      <a 
        href={`https://boardgamegeek.com/boardgame/${bggId}`} 
        target="_blank"
        rel="noreferrer"
      >
        <Typography level="body-md" sx={{color: 'blue'}}>BoardGameGeek</Typography>
      </a>
    </div>
  )
}

export default GameSummary;
