import Typography from '@mui/joy/Typography'
import Link from 'next/link'
import {RankedGameList} from 'board-game-data'

import styles from './GameImageList.module.scss'

export interface GameImageListProps {
  className: string,
  gamesList: RankedGameList,
  primaryDirection: 'horizontal'|'vertical',
  linkRoot: string,
  icon: string,
}

export function GameImageList({
  className = '',
  gamesList,
  primaryDirection = 'horizontal',
  linkRoot = '',
  icon = '',
}: GameImageListProps) {

  let directionClassName = ''
  switch(primaryDirection) {
    case 'horizontal': {
      directionClassName = styles.containerHorizontal
      break
    }
    case 'vertical': {
      directionClassName = styles.containerVertical
      break
    }
  }

  return (
    <div className={`${className} ${styles.container} ${directionClassName}`}>
      {gamesList.slice(-3).reverse().map(({game, bggId}) => (
        <Link key={bggId} href={`${linkRoot}#game-${bggId}`} className={styles.imageContainer}>
          <div role="presentation" className={styles.gameImage} style={{backgroundImage: `url('${game.image}')`}} />
        </Link>
      ))}
      <div role="presentation" className={styles.tagIcon + ' ' + styles.tagIconBlur}>{icon}</div>
      <div role="presentation" className={styles.tagIcon}>{icon}</div>
    </div>
  )
}

export default GameImageList
