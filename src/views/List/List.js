import * as React from "react"
import ReactMarkdown from 'react-markdown'

import Font from 'atoms/Font'
import Image from 'atoms/Image'
import Button from 'atoms/Button'

import CreatorMini from 'components/CreatorMini'
import GameMini from 'components/GameMini'

import './list.scss'

const cn = 'list-view'

const ListView = ({list, games, basePath}) => {

  return (
    <div className={cn}>
      <div className={`${cn}__image-wrapper`}>
        <Image className={`${cn}__image`} src={list.image} alt={'View ' + list.name} isBordered={false} />
      </div>
      <section className={`${cn}__info`}>
        <h1>
          {list.name}
        </h1>
        <Font level="delta" className={`${cn}__desc`}>
          <ReactMarkdown>{list.description.description}</ReactMarkdown>
        </Font>
        <Button type="link" hollow to={list.link} target="_blank">Original URL</Button>
      </section>
      <section className={`${cn}__creator`}>
        <CreatorMini creator={list.creator} />
      </section>
      <section className={`${cn}__games`}>
        <h2>Games</h2>
        <ol className={`${cn}__game-list`}>
          {list.gameLink.map(({title, bggId}, index) => (
            <li key={index}>
              <div className={`${cn}__game-title`}>{title}</div>
              <GameMini className={`${cn}__game-info`} game={games.find(game => game.bggId == bggId)} basePath={basePath} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default ListView
