import React, {useState} from "react"
import ReactMarkdown from "react-markdown"
import {Link} from 'gatsby'

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Image from 'atoms/Image'

import SimpleTwoColumn from 'layout/SimpleTwoColumn'

import ListsBox from 'components/ListsBox'
import TagBrief from 'components/TagBrief'

import './game.scss'

const cn = 'game-view'

const AttributeValue = ({value, isShortable = true}) => {
  if(value.length === 1) {
    return value
  }
  
  const shortList = isShortable && value.length > 4 ? value.slice(0, 3) : value
  const isEtc = shortList.length < value.length
  const etcLength = value.length - shortList.length
  
  return (
    <ul>
      {shortList.map(item => <li key={item}>{item}</li>)}
      {isEtc && (
        <li className={`${cn}__minimalized`}>... {etcLength} more</li>
      )}
    </ul>
  )
}

const GameView = ({game, lists, tags}) => {

  const [isDescExpanded, updateIsDescExpanded] = useState(false)

  const playerCount = game.playerCountMin + (game.playerCountMax !== game.playerCountMin ? `- ${game.playerCountMax}` : '')

  const handleDescriptionToggle = () => updateIsDescExpanded(!isDescExpanded)

  return (
    <SimpleTwoColumn 
      className={cn}
      classNames={{
        right: `${cn}__right`
      }}
      content={{
        leftTop: (
          <>
            <div>
              <h1>
                {game.name}
              </h1>
              <Font level="charlie" className={`${cn}__desc`}>
                <span className={`${cn}__value`}>Year:</span> {game.yearPublished}
              </Font>
            </div>
            <div>
              <Link to="image" className={`${cn}__image-wrapper`}>
                <Image className={`${cn}__image`} src={game.image} alt={'View ' + game.name} />
              </Link>
            </div>
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
          </>
        ),
        right: (
          <>
            {(tags || []).length > 0 && (
              <div className={`${cn}__tags`}>
                <h2>Categories</h2>
                <Font level="delta" className={`${cn}__tag-list`}>
                  {tags.map(tag => (
                    <Link key={tag.slug} className={`${cn}__tag`} to={`/${tag.slug}/`}>
                      <TagBrief tag={tag} stacked />
                    </Link>
                  ))}
                </Font>
              </div>
            )}
            <h2>Details</h2>
            <Font level="delta" Ele="dl">
              <dt className={`${cn}__attr-label`}>Player Count</dt>
              <dd className={`${cn}__attr-value`}>{playerCount}</dd>
              <dt className={`${cn}__attr-label`}>Designer{(game.designer || []).length > 1 ? 's' : ''}</dt>
              <dd className={`${cn}__attr-value`}>
                <AttributeValue value={game.designer || []} />
              </dd>
              <dt className={`${cn}__attr-label`}>Publisher{(game.publisher || []).length > 1 ? 's' : ''}</dt>
              <dd className={`${cn}__attr-value`}>
                <AttributeValue value={game.publisher || []} />
              </dd>
              <dt className={`${cn}__attr-label`}>Artist{(game.artist || []).length > 1 ? 's' : ''}</dt>
              <dd className={`${cn}__attr-value`}>
                <AttributeValue value={game.artist || []} />
              </dd>
              <dt className={`${cn}__attr-label`}>Mechanic{(game.mechanic || []).length > 1 ? 's' : ''}</dt>
              <dd className={`${cn}__attr-value`}>
                <AttributeValue value={game.mechanic || []} isShortable={false} />
              </dd>
            </Font>
          </>
        ),
        leftBot: (
          <>
            <h2>Part of these lists</h2>
            <ListsBox lists={lists} />
          </>
        )
      }}
      />
  )
}

export default GameView
