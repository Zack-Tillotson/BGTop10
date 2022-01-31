import * as React from "react"
import ReactMarkdown from "react-markdown"

import GameMini from 'components/GameMini'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

import './component.scss'

const baseCn = 'tag-view'

const TagView = ({tag, creators, lists, games}) => {

  return (
    <>
      <div className={`${baseCn}__title-section`}>
        <h1>{tag.pageTitle}</h1>
        {tag.pageSubtitle && (
          <p>{tag.pageSubtitle.pageSubtitle}</p>
        )}
      </div>
      <div className={`${baseCn}__header-images`}>
        {games.slice(0, 3).map(game => (
          <div key={game.bggId} role="presentation" className={`${baseCn}__header-image-wrapper`}>
            <div key={game.bggId} role="presentation" className={`${baseCn}__header-image`} style={{backgroundImage: `url("${game.image}")`}} alt={game.title} />
          </div>
        ))}
      </div>
      {tag.introduction && (
        <section>
          <ReactMarkdown>
            {tag.introduction.introduction}
          </ReactMarkdown>
        </section>
      )}
      <section>
        <h4>Popular creators</h4>
        <CreatorPills creators={creators} />
      </section>
      <section>
        <h2>Check out these game lists</h2>
        <ListsBox lists={lists} />
      </section>
      <section>
        <h2>Hot games</h2>
        <ul>
          {games.slice(0, 10).map(game => (
            <li key={game.bggId}>
              <GameMini game={game} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default TagView
