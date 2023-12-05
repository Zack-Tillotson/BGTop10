import Typography from '@mui/joy/Typography'

import styles from './TagFull.module.scss'
import { RankedGameList, Tag } from 'board-game-data';
import { TagSummary } from '../TagSummary';

export interface TagFullProps {
  tag: Tag,
  gamesList: RankedGameList,
}

export function TagFull({
  tag, 
  gamesList,
}: TagFullProps) {

  return (
    <section className={styles.container}>
      <TagSummary tag={tag} gamesList={gamesList} />
      <ol reversed>
        {gamesList.map((rankedGame) => {
          if(!rankedGame.game) {
            return (
              <li><b>Error</b> game not found: {rankedGame.bggId}</li>
            )
          }
          const {game: {name}} = rankedGame
          return (
            <li key={name}>
              {name}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default TagFull;
