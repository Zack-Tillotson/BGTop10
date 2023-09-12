import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'
import {Game} from 'board-game-data'

import styles from './ListSummary.module.scss'

/* eslint-disable-next-line */
export interface ListSummaryProps {
  title: string,
  games: Game[],
}

export function ListSummary({
  title,
  games,
}: ListSummaryProps) {
  return (
    <section>
      <Typography level="h2">{title}</Typography>
      {games.map(game => (
        <GameSummary key={game.id} {...game} />
      ))}
    </section>
  )
}

export default ListSummary;
