import Typography from '@mui/joy/Typography'

import styles from './TagFull.module.scss'
import { Game, Tag } from 'board-game-data';
import { TagSummary } from '../TagSummary';

export interface TagFullProps {
  tag: Tag,
  gamesList: {count: number, game: Game}[],
}

export function TagFull({
  tag, 
  gamesList,
}: TagFullProps) {

  return (
    <section className={styles.container}>
      <TagSummary tag={tag} gamesList={gamesList} />
      <ol reversed>
        {gamesList.map(({game: {name}}) => (
          <li key={name}>
            {name}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default TagFull;
