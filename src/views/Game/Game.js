import * as React from "react"

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import ListMini from 'components/ListMini'

import './game.scss'

const cn = 'game-view'

const GameView = ({game}) => {

  const playerCount = game.playerCountMin + (game.playerCountMax !== game.playerCountMin ? `- ${game.playerCountMax}` : '')

  return (
    <div className={cn}>
      <div className={`${cn}__image-wrapper`}>
        <Image className={`${cn}__image`} src={game.image} alt={'View ' + game.name} isBordered={false} />
      </div>
      <section className={`${cn}__info`}>
        <h1>
          {game.name}
        </h1>
        <Font level="charlie" className={`${cn}__desc`}>
          ({game.yearPublished})
        </Font>
      </section>
      <section className={`${cn}__attributes`}>
        <h2>Attributes</h2>
        <Font level="delta" className={`${cn}__key`}>Player Count</Font>
        <Font level="delta" className={`${cn}__value`}>{playerCount}</Font>
        <Font level="delta" className={`${cn}__key`}>Designer</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{game.designer.join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Publisher</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{game.publisher.join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Artists</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{game.artist.join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Mechanics</Font>
        <Font level="delta" className={`${cn}__value ${cn}__longish`}>{game.mechanic.join(', ')}</Font>
      </section>
      <section className={`${cn}__lists`}>
        <h2>Part of these lists</h2>
        <ol className={`${cn}__lists-list`}>
          {game.listGameLink.map(link => (
            <li key={link.id}>
              <ListMini list={link.list} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default GameView
