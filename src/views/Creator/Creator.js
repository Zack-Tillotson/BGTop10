import * as React from "react"
import ReactMarkdown from "react-markdown"

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Image from 'atoms/Image'

import ListMini from 'components/ListMini'

import './creator.scss'

const cn = 'creator-view'

const CreatorView = ({creator}) => {

  return (
    <div className={cn}>
      <div className={`${cn}__image-wrapper`}>
        <Image className={`${cn}__image`} src={creator.imageBanner} alt={creator.name} isBordered={false} />
      </div>
      <section className={`${cn}__info`}>
        <h1>
          {creator.name}
        </h1>
      </section>
      <section className={`${cn}__attributes`}>
        <Font level="delta">
          <ReactMarkdown>
            {creator.description}
          </ReactMarkdown>
        </Font>
      </section>
      <section>
        <h4>Links</h4>
        <div className={`${cn}__links`}>
          {creator.link.map(link => (
            <Button type="anchor" href={link.url} target="_blank">{link.display}</Button>
          ))}
        </div>
      </section>
      <section className={`${cn}__lists`}>
        <h2>Lists</h2>
        <ol className={`${cn}__lists-list`}>
          {creator.list.map(list => (
            <li key={list.slug}>
              <ListMini list={list} showCreator={false} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default CreatorView
