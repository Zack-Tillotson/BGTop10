import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'
import {Game} from 'board-game-data'

import styles from './GameList.module.scss'

/* eslint-disable-next-line */
export interface GameListProps {
  games: Game[],
}

export function GameList({
  games,
}: GameListProps) {
  return (
    <ol>
      {games.map(game => (
        <GameSummary key={game.id} {...game} />
      ))}
    </ol>
  )
}

export default GameList;
