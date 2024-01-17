import {Game} from 'board-game-datatypes'

import styles from './GameImage.module.scss'

export interface GameImageProps {
  src: Game["image"],
  srcSet?: Game["imageSrcSet"],
  sizes?: string,
  className?: string,
}

function getDefaultSizes(srcSet: Game["imageSrcSet"] = {}) {

  const sizes = Object.keys(srcSet)

  if(sizes.length === 0) return ''

  return [
    ...sizes.slice(0, -1)
      .map(size => `(max-width: ${size}px) ${size}w`),
    `${sizes.slice(-1)[0]}w`
  ].join(', ')
}

export function GameImage({
  className = '',
  src,
  srcSet = {},
  sizes = '',
}: GameImageProps) {

  const srcSetString = Object.keys(srcSet).map(size => `${srcSet[size]} ${size}w`).join(', ')
  const sizesString = sizes || getDefaultSizes(srcSet)
  return (
    <img 
      src={src}
      srcSet={srcSetString}
      sizes={sizesString}
      width="550"
      height="550"
      className={`${className} ${styles.container}`}
      alt={'Game poster'}
    />
  )
}

export default GameImage
