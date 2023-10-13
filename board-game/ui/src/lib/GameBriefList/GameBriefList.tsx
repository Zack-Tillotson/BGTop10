import Typography from '@mui/joy/Typography'
import {GameBrief} from 'board-game-ui'
import {RankedGameList} from 'board-game-data'

import styles from './GameBriefList.module.scss'
import { Card } from '@mui/joy'

/* eslint-disable-next-line */
export interface GameBriefListProps {
  gamesList: RankedGameList,
  className: string,
}

export function GameBriefList({
  gamesList,
  className = '',
}: GameBriefListProps) {
  return (
    <Card>
      <nav className={[styles.container, className].join(' ')}>
        <Typography level="h3" className={styles.title}>Quick list</Typography>
        <ol className={styles.ol} reversed>
          {gamesList.map(({game}) => (
            <li key={game.id} className={styles.li}>
              <a href={`#game-${game.bggId}`} className={styles.section}>
                <GameBrief {...game}/>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Card>
  )
}

export default GameBriefList;
