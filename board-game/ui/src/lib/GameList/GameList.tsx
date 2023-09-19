import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'
import {GamesList} from 'board-game-data'

import styles from './GameList.module.scss'

/* eslint-disable-next-line */
export interface GameListProps {
  gamesList: GamesList,
  className: string,
}

export function GameList({
  gamesList,
  className = '',
}: GameListProps) {
  return (
    <ol className={[styles.ol, className].join(' ')}>
      {gamesList.map(({game, count}, index) => (
        <li key={game.id} className={styles.li}>
          <section className={styles.section}>
            <GameSummary {...game} extraTitle={`${10 - index}. `}/>
          </section>
        </li>
      ))}
    </ol>
  )
}

export default GameList;
