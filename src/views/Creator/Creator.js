import * as React from "react"
import ReactMarkdown from "react-markdown"
import {Link} from 'gatsby'

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Image from 'atoms/Image'

import ListsBox from 'components/ListsBox'
import SimpleTwoColumn from 'layout/SimpleTwoColumn'
import TagBrief from 'components/TagBrief'

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
  if(url.toLowerCase().includes('pinterest.com')) return 'Pinterest'

  return 'Site'
}

const CreatorView = ({creator, lists = [], tags}) => {

  return (
    <SimpleTwoColumn 
      className={cn}
      classNames={{
        right: `${cn}__right`
      }}
      content={{
        leftTop: (
          <>
            <div className={`${cn}__banner-wrapper`}>
              <Image className={`${cn}__banner`} src={creator.imageBanner} alt={creator.name + ' creator'} isBordered={false} />
            </div>
            <section className={`${cn}__info`}>
              <div className={`${cn}__avatar-wrapper`}>
                <Image className={`${cn}__avatar`} src={creator.imageAvatar} alt={creator.name + ' avatar'} isBordered={false} />
              </div>
              <h1 className={`${cn}____title`}>
                {creator.name}
              </h1>
              <Font level="delta" className={`${cn}__description`}>
                <h3>Description</h3>
                <ReactMarkdown>
                  {creator.description.description}
                </ReactMarkdown>
              </Font>
            </section>
            <section>
              <h3>Links</h3>
              <div className={`${cn}__links`}>
                {creator.link.map((link, index) => (
                  <span key={link}>
                    {index !== 0 && "??? "}
                    <Button type="anchor" minimal href={link} target="_blank" className={`${cn}__link`}>
                      {getLinkTextFromUrl(link)}
                    </Button>
                  </span>
                ))}
              </div>
            </section>
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
          </>
        ),
        leftBot: (
          <>
            <h2>Lists</h2>
            <ListsBox lists={lists} />
          </>
        ),
      }}
      />
  )
}

export default CreatorView
