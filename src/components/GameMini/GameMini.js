import * as React from "react"
import classnames from 'classnames'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import './game-mini.scss'

const cn = 'game-mini'

const GameMini = ({game = {}, className}) => {

  let {
    bggId = 0,
    name = '',
    image = '',
    yearPublished = '',
    playerCountMin = 0,
    playerCountMax = 0,
    designer = [],
    publisher = [],
  } = game

  if(!designer) designer = []
  if(!publisher) publisher = []

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
      <Font level="delta" className={`${cn}__secondary-attrs`}>
        <div className={`${cn}__attr-name`}>Players: </div>
        <div className={`${cn}__attr-value`}>{playerCount}</div>

        <div className={`${cn}__attr-name`}>Designer: </div>
        <div className={`${cn}__longish`}>{designer.join(', ')}</div>

        <div className={`${cn}__attr-name`}>Publisher: </div>
        <div className={`${cn}__longish`}>{publisher.join(', ')}</div>
      </Font>
    </section>
  )
}

export default GameMini
