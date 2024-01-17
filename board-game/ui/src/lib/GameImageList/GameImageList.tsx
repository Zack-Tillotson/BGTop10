import {RankedGameList} from 'board-game-datatypes'

import styles from './GameImageList.module.scss'
import {GameImage} from '../GameImage'

const IMAGE_COUNT = 10

export interface GameImageListProps {
  gamesList: RankedGameList,
  className?: string,
  variant?: 'A'|'B'|'C'|'D',
  sizes?: string,
  isLinks?: boolean,
}

export function GameImageList({
  className = '',
  gamesList,
  variant = 'A',
  sizes,
  isLinks = false,
}: GameImageListProps) {

  return (
    <div role="presentation" className={`${className} ${styles.container}`}>
      <div role="presentation" className={`${styles.gameImageGrid} ${styles[`variant${variant}`]}`}>
        {gamesList.slice(-1 * IMAGE_COUNT).map(({game, bggId}, index) => {
          const Ele = isLinks ? 'a' : 'div'
          const extraProps = isLinks ? {href: `#game-${bggId}`} : {}
          return (
            <Ele
              key={bggId}
              {...extraProps}
              className={`${styles.gameImageWrapper} ${styles[`image${IMAGE_COUNT - index}`]}`}>
                <GameImage
                  className={styles.gameImage}
                  src={game.imageHosted || game.image}
                  srcSet={game.imageSrcSet}
                  sizes={sizes}
                />
            </Ele>
          )
        })}
      </div>
      <div className={styles.attribution}>Graphic: Zack Tillotson | Images: BoardGameGeek.com</div>
    </div>
  )
}

export default GameImageList
