import {RankedGameList} from 'board-game-data'

import styles from './GameImageList.module.scss'
import {GameImage} from '../GameImage'

const IMAGE_COUNT = 10

export interface GameImageListProps {
  gamesList: RankedGameList,
  className?: string,
  variant?: 'A'|'B'|'C'|'D',
  sizes?: string,
}

export function GameImageList({
  className = '',
  gamesList,
  variant = 'A',
  sizes,
}: GameImageListProps) {

  return (
    <div role="presentation" className={`${className} ${styles.container}`}>
      <div role="presentation" className={`${styles.gameImageGrid} ${styles[`variant${variant}`]}`}>
        {gamesList.slice(-1 * IMAGE_COUNT).map(({game, bggId}, index) => (
          <div
            key={bggId}
            className={`${styles.gameImageWrapper} ${styles[`image${IMAGE_COUNT - index}`]}`}>
              <GameImage
                className={styles.gameImage}
                src={game.imageHosted || game.image}
                srcSet={game.imageSrcSet}
                sizes={sizes}
              />
          </div>
        ))}
      </div>
      <div className={styles.attribution}>Graphic: Zack Tillotson | Images: BoardGameGeek.com</div>
    </div>
  )
}

export default GameImageList
