import Typography from '@mui/joy/Typography'
import Table from '@mui/joy/Table'

import {GameImage} from '../GameImage'
import {Game} from 'board-game-datatypes'

import styles from './GameSummary.module.scss'

function getShortString(stringArray: string[] = [], maxCount: number) {
  return `${stringArray.slice(0, maxCount).join(', ')}${stringArray.length > maxCount ? ` + ${stringArray.length - maxCount} more` : ''}`
}

export interface GameSummaryProps extends Game {
  extraTitle?: string,
  ranking?: string,
}

export function GameSummary({
  extraTitle,
  ranking,
  name,
  description,
  yearPublished,
  designer,
  publisher,
  artist,
  bggId,
  playerCountMin,
  playerCountMax,
  image,
  imageSrcSet,
}: GameSummaryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.ranking}>{ranking}</div>
      <div className={styles.imageContainer}>
        <GameImage className={styles.image} src={image} srcSet={imageSrcSet} sizes="275px" />
      </div>
      <div className={styles.primaryAttrs}>
        <Typography level="h3" id={`game-${bggId}`}>
          {extraTitle && (
            <span className={styles.extraTitle}>{extraTitle}</span>
          )}
          {name}
        </Typography>
    </div>
      <Table className={styles.secondaryAttrs} size="sm">
        <tbody>
          <tr>
            <th scope="row">Year published</th>
            <td>{yearPublished}</td>
          </tr>
          <tr>
            <th scope="row">Designer</th>
            <td>{getShortString(designer, 3)}</td>
          </tr>
          <tr>
            <th scope="row">Artists</th>
            <td>
              {getShortString(artist, 2)}
            </td>
          </tr>
          <tr>
            <th scope="row">Publisher</th>
            <td>{getShortString(publisher, 1)}</td>
          </tr>
          <tr>
            <th scope="row">Player count</th>
            <td>
              {playerCountMin}
              {playerCountMin !== playerCountMax && ` - ${playerCountMax}`}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default GameSummary;
