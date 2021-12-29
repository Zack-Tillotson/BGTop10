import * as React from "react"
import classnames from 'classnames'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import './game-mini.scss'

const cn = 'game-mini'

const GameMini = ({game, className}) => {

  const playerCount = game.playerCountMin + (game.playerCountMax !== game.playerCountMin ? `- ${game.playerCountMax}` : '')

  return (
    <section className={classnames(cn, className)}>
      <Link to={`/game/${game.bggId}/`} className={`${cn}__image-wrapper`}>
        <Image src={game.image} className={`${cn}__image`} />
      </Link>
      <div className={`${cn}__primary-attrs`}>
        <Link to={`/game/${game.bggId}/`}>
          <Font level="bravo" className={`${cn}__name ${cn}__value`}>{game.name}</Font>
        </Link>
        <Font level="delta">({game.yearPublished})</Font>
      </div>
      <div className={`${cn}__secondary-attrs ${cn}__longish`}>
        <Font level="delta" className={`${cn}__key`}>Player Count</Font>
        <Font level="delta" className={`${cn}__value`}>{playerCount}</Font>
        <Font level="delta" className={`${cn}__key`}>Designer</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{game.designer.join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Publisher</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{game.publisher.join(', ')}</Font>
      </div>
    </section>
  )
}

export default GameMini
