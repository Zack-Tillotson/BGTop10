import Link from 'next/link'
import {GameSummary} from '../GameSummary'
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
        const extraTitle = isScoreDisplayed ? `${gamesList.length - index}. (${count} pts)` : ''
        
        if(!game) {
          return (
            <li key={bggId} className={styles.gameNotFound}>
              {extraTitle} Game not found - BGG Id: {bggId}
            </li>
          )
        }
        return (
          <li key={bggId} className={styles.li}>
            <Link href={`/game/${bggId}/`} className={styles.anchor}>
              <GameSummary {...game} extraTitle={extraTitle} />
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export default GameList;
