import * as React from "react"

import Font from 'atoms/Font'
import Image from 'atoms/Image'
import CreatorMini from 'components/CreatorMini'
import GameMini from 'components/GameMini'

import './list.scss'

const cn = 'list-view'

const ListView = ({list, basePath}) => {

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
          {list.description.markdown}
        </Font>
      </section>
      <section className={`${cn}__creator`}>
        <CreatorMini creator={list.creator} />
      </section>
      <section className={`${cn}__games`}>
        <h2>Games</h2>
        <ol className={`${cn}__game-list`}>
          {list.listGameLink.map(link => (
            <li key={link.id}>
              <div className={`${cn}__game-title`}>{link.title}</div>
              <GameMini className={`${cn}__game-info`} game={link.game} basePath={basePath} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default ListView
