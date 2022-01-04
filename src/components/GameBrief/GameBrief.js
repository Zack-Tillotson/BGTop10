import * as React from "react"

import Button from 'atoms/Button'

import './game-brief.scss'

const cn = 'game-brief'

const GameBrief = ({game, wide = false, Element = Button, ...rest}) => {
  const specialProps = Element === Button ? {wide: true, tight: true} : {}
  return (
    <Element className={`${cn} ${wide && `${cn}--wide`}`} {...specialProps} {...rest}>
      <div className={`${cn}__title`}>{game.name} ({game.yearPublished})</div>
    </Element>
  )
}

export default GameBrief
