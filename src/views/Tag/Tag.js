import * as React from "react"

import ReactMarkdown from "react-markdown"

import TitleRow from 'atoms/TitleRow'
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
        <TitleRow title={`Top 10 ${tag.display}`} className={`${baseCn}__title-row`}>
        </TitleRow>
        <ol reversed className={`${baseCn}__ordered-list`}>
          {games.slice(0, 10).reverse().map((game, index, {length: arraySize}) => (
            <li key={game.bggId} className={`${baseCn}__ordered-list-line`} data-count={game.count}>
              <div className={`${baseCn}__ordered-list-number-wrapper`}>
                <div className={`${baseCn}__ordered-list-number`}>
                  {arraySize - index}.
                </div>
              </div>
              <GameMini game={game} className={`${baseCn}__ordered-list-mini`} />
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h4>Popular creators</h4>
        <CreatorPills creators={creators} />
      </section>
      <section>
        <h2>See why these games make the best {tag.display}</h2>
        <ListsBox lists={lists} />
      </section>
    </>
  )
}

export default TagView
