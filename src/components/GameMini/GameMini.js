import * as React from "react"
import classnames from 'classnames'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import './game-mini.scss'

const cn = 'game-mini'

const GameMini = ({game = {}, className}) => {

  const {
    bggId = 0,
    name = '',
    image = '',
    yearPublished = '',
    playerCountMin = 0,
    playerCountMax = 0,
    designer = [],
    publisher = [],
  } = game

  const playerCount = playerCountMin + (playerCountMax !== playerCountMin ? `- ${playerCountMax}` : '')

  return (
    <section className={classnames(cn, className)}>
      <Link to={`/game/${bggId}/`} className={`${cn}__image-wrapper`}>
        <Image src={image} className={`${cn}__image`} isBordered={false} />
      </Link>
      <div className={`${cn}__primary-attrs`}>
        <Link to={`/game/${bggId}/`}>
          <Font level="bravo" className={`${cn}__name ${cn}__value`}>{name}</Font>
        </Link>
        <Font level="delta">({yearPublished})</Font>
      </div>
      <div className={`${cn}__secondary-attrs ${cn}__longish`}>
        <Font level="delta" className={`${cn}__key`}>Player Count</Font>
        <Font level="delta" className={`${cn}__value`}>{playerCount}</Font>
        <Font level="delta" className={`${cn}__key`}>Designer</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{designer.join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Publisher</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{publisher.join(', ')}</Font>
      </div>
    </section>
  )
}

export default GameMini
