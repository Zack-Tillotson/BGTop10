import React, {useState} from "react"
import ReactMarkdown from "react-markdown"

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Image from 'atoms/Image'

import ListsBox from 'components/ListsBox'

import './game.scss'

const cn = 'game-view'

const GameView = ({game, lists}) => {

  const [isDescExpanded, updateIsDescExpanded] = useState(false)

  const playerCount = game.playerCountMin + (game.playerCountMax !== game.playerCountMin ? `- ${game.playerCountMax}` : '')

  const handleDescriptionToggle = () => updateIsDescExpanded(!isDescExpanded)

  return (
    <div className={cn}>
      <section className={`${cn}__info`}>
        <h1>
          {game.name}
        </h1>
        <Font level="charlie" className={`${cn}__desc`}>
          <span className={`${cn}__value`}>Year:</span> {game.yearPublished}
        </Font>
      </section>
      <div className={`${cn}__image-wrapper`}>
        <Image className={`${cn}__image`} src={game.image} alt={'View ' + game.name} />
      </div>
      <section className={`${cn}__attributes`}>
        <Font level="charlie" className={`${cn}__bgg-link`}>
          <Button type="anchor" wide secondary href={`https://boardgamegeek.com/boardgame/${game.bggId}/`} target="_blank">Board Game Geek</Button>
        </Font>
        {!!game.description && (
          <>
            <div className={`${cn}__description-wrapper`}>
              <Font level="charlie" className={`${cn}__description ${isDescExpanded ? `${cn}__description--expanded` : `${cn}__description--shrunk`}`}>
                <ReactMarkdown>
                  {game.description.description}
                </ReactMarkdown>
              </Font>
              {!isDescExpanded && (
                <div className={`${cn}__description-haze`} />
              )}
            </div>
            <Button minimal onClick={handleDescriptionToggle}>{isDescExpanded ? '- Less' : '+ More'}</Button>
          </>
        )}
        <h2>Attributes</h2>
        <Font level="delta" className={`${cn}__key`}>Player Count</Font>
        <Font level="charlie" className={`${cn}__value`}>{playerCount}</Font>
        <Font level="delta" className={`${cn}__key`}>Designer</Font>
        <Font level="charlie" className={`${cn}__value ${cn}__longish`}>{(game.designer || []).join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Publisher</Font>
        <Font level="charlie" className={`${cn}__value ${cn}__longish`}>{(game.publisher || []).join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Artists</Font>
        <Font level="charlie" className={`${cn}__value ${cn}__longish`}>{(game.artist || []).join(', ')}</Font>
        <Font level="delta" className={`${cn}__key`}>Mechanics</Font>
        <Font level="charlie" className={`${cn}__value ${cn}__longish`}>{(game.mechanic || []).join(', ')}</Font>
      </section>
      <section className={`${cn}__lists`}>
        <h2>Part of these lists</h2>
        <ListsBox lists={lists} />
      </section>
    </div>
  )
}

export default GameView
