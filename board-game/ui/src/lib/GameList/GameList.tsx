import {GameSummary} from 'board-game-ui'
import {RankedGameList} from 'board-game-data'

import styles from './GameList.module.scss'

/* eslint-disable-next-line */
export interface GameListProps {
  gamesList: RankedGameList,
  className?: string,
  isScoreDisplayed: boolean,
}

export function GameList({
  gamesList,
  className = '',
  isScoreDisplayed = false,
}: GameListProps) {
  return (
    <ol className={[styles.ol, className].join(' ')}>
      {gamesList.map(({game, count, bggId}, index) => {
        const extraTitle = `${gamesList.length - index}. ${isScoreDisplayed ? ` (${count} pts) ` : ''}`
        
        if(!game) {
          return (
            <div key={bggId} className={styles.gameNotFound}>
              {extraTitle} Game not found - BGG Id: {bggId}
            </div>
          )
        }
        return (
          <li key={game.id} className={styles.li}>
            <GameSummary {...game} extraTitle={extraTitle} />
          </li>
        )
      })}
    </ol>
  )
}

export default GameList;
