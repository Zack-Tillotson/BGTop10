import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'

import {RankedGameList} from 'board-game-datatypes'

import {GameBrief} from '../GameBrief'

import styles from './GameBriefList.module.scss'

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
        <Typography level="h3" className={styles.title}>The games</Typography>
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
