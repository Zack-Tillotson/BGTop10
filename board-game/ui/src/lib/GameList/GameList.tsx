import Link from 'next/link'
import Typography from '@mui/joy/Typography'
import {GameSummary} from '../GameSummary'
import {RankedGameList} from 'board-game-datatypes'

import styles from './GameList.module.scss'

/* eslint-disable-next-line */
export interface GameListProps {
  title?: string,
  gamesList: RankedGameList,
  className?: string,
  isScoreDisplayed?: boolean,
  isRankingDisplayed?: boolean,
}

export function GameList({
  gamesList,
  className = '',
  isScoreDisplayed = false,
  isRankingDisplayed = false,
}: GameListProps) {
  return (
    <section className={className}>
      <Typography level="h2" className={styles.title} id="game-list">The list: top {gamesList.length} games</Typography>
      <ol className={styles.ol}>
        {gamesList.map(({game, count, bggId}, index) => {
          const extraTitle = isScoreDisplayed ? `${gamesList.length - index}. (${count} pts)` : ''
          const ranking = isRankingDisplayed ? `${gamesList.length - index}` : ''
          if(!game) {
            return (
              <li key={bggId} className={styles.gameNotFound}>
                {extraTitle} Game not found - BGG Id: {bggId}
              </li>
            )
          }
          return (
            <li key={bggId} className={styles.li}>
              <Link href={`/game/${bggId}`} className={styles.anchor}>
                <GameSummary {...game} extraTitle={extraTitle} ranking={ranking} />
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default GameList;
