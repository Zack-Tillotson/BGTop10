import {RankedGameList} from 'board-game-data'

import styles from './GameImageList.module.scss'

const IMAGE_COUNT = 10

export interface GameImageListProps {
  gamesList: RankedGameList,
  className?: string,
  variant?: 'A'|'B'|'C'|'D',
}

export function GameImageList({
  className = '',
  gamesList,
  variant = 'A',
}: GameImageListProps) {

  return (
    <div role="presentation" className={`${className} ${styles.container}`}>
      <div role="presentation" className={`${styles.imageContainer} ${styles[`variant${variant}`]}`}>
        {gamesList.slice(-1 * IMAGE_COUNT).map(({game, bggId}, index) => (
          <div key={bggId} className={`${styles.gameImage} ${styles[`image${IMAGE_COUNT - index}`]}`} style={{backgroundImage: `url('${game.image}')`}} />
        ))}
      </div>
      <div className={styles.attribution}>Graphic: Zack Tillotson | Source images: BoardGameGeek.com</div>
    </div>
  )
}

export default GameImageList
