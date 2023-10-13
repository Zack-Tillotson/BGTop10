import {GameSummary} from 'board-game-ui'
import {RankedGameList} from 'board-game-data'

import styles from './GameList.module.scss'

/* eslint-disable-next-line */
export interface GameListProps {
  gamesList: RankedGameList,
  className?: string,
}

export function GameList({
  gamesList,
  className = '',
}: GameListProps) {
  return (
    <ol className={[styles.ol, className].join(' ')}>
      {gamesList.map(({game, count}, index) => (
        <li key={game.id} className={styles.li}>
          <GameSummary {...game} extraTitle={`${gamesList.length - index}. `}/>
        </li>
      ))}
    </ol>
  )
}

export default GameList;
