import * as React from "react"

import Image from 'atoms/Image'

import './game-brief.scss'

const cn = 'game-brief'

const GameBrief = ({game, className = '', ...rest}) => {
  return (
    <div className={`${cn} ${className}`} {...rest}>
      {game.image && (
        <Image src={game.image} className={`${cn}__image`} isBordered={false} />
      )}
      <div className={`${cn}__title`}>{game.name} ({game.yearPublished})</div>
    </div>
  )
}

export default GameBrief
