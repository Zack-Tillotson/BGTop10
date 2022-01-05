import * as React from "react"
import ReactMarkdown from "react-markdown"

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Image from 'atoms/Image'

import ListMini from 'components/ListMini'

import './creator.scss'

const cn = 'creator-view'

function getLinkTextFromUrl(url) {
  if(url.toLowerCase().includes('youtube.com')) return 'Youtube'
  if(url.toLowerCase().includes('twitch.tv')) return 'Twitch'
  if(url.toLowerCase().includes('facebook.com')) return 'Facebook'
  if(url.toLowerCase().includes('instagram.com')) return 'Instagram'
  if(url.toLowerCase().includes('patreon.com')) return 'Patreon'
  if(url.toLowerCase().includes('discord.com')) return 'Discord'
  if(url.toLowerCase().includes('twitter.com')) return 'Twitter'
  return 'Site'
}

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
            {creator.description.description}
          </ReactMarkdown>
        </Font>
      </section>
      <section>
        <h4>Links</h4>
        <div className={`${cn}__links`}>
          {creator.link.map(link => (
            <Button key={link} type="anchor" href={link} target="_blank">{getLinkTextFromUrl(link)}</Button>
          ))}
        </div>
      </section>
      <section className={`${cn}__lists`}>
        <h2>Lists</h2>
        <ol className={`${cn}__lists-list`}>
          {(creator.list || []).filter((item, index) => index === 0 || item.slug !== creator.list[index-1].slug).map(list => (
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
