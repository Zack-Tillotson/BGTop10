import Link from 'next/link'
import {RankedGameList} from 'board-game-data'

import styles from './GameImageList.module.scss'

const IMAGE_COUNT = 10

export interface GameImageListProps {
  className: string,
  gamesList: RankedGameList,
  variant: 'A'|'B',
}

export function GameImageList({
  className = '',
  gamesList,
  variant = 'A',
}: GameImageListProps) {

  return (
    <div role="presentation" className={`${className} ${styles.container} ${styles[`variant${variant}`]}`}>
      {gamesList.slice(-1 * IMAGE_COUNT).reverse().map(({game, bggId}, index) => (
        <div key={bggId} className={`${styles.gameImage} ${styles[`image${IMAGE_COUNT - index}`]}`} style={{backgroundImage: `url('${game.image}')`}} />
      ))}
    </div>
  )
}

export default GameImageList
