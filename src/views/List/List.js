import * as React from "react"
import ReactMarkdown from 'react-markdown'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Button from 'atoms/Button'

import SimpleTwoColumn from 'layout/SimpleTwoColumn'

import CreatorBrief from 'components/CreatorBrief'
import CreatorMini from 'components/CreatorMini'
import GameMini from 'components/GameMini'
import TagBrief from 'components/TagBrief'

import './list.scss'

const cn = 'list-view'

const ListView = ({list, games, basePath}) => {

  return (
    <SimpleTwoColumn 
      className={cn}
      content={{
        leftTop: (
          <>
            <div className={`video-container`}>
              <iframe 
                src={`https://www.youtube.com/embed/${list.link.split('=').slice(-1)}`} 
                title={`${list.name} | YouTube`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen />
            </div>
            <h1>
              {list.name}
            </h1>
            <div className={`${cn}__date`}>
              <span className={`${cn}__date-title`}>Published: </span> {new Date(list.datePublished).toUTCString().slice(5, 16)}
            </div>
            <Font level="delta" className={`${cn}__desc`}>
              <ReactMarkdown>{list.description.description}</ReactMarkdown>
            </Font>
          </>
        ),
        right: (
          <>
            <CreatorMini creator={list.creator} className={`${cn}__creator-mini`} Element={Link} to={`/creator/${list.creator.slug}/`} />
            <CreatorBrief creator={list.creator} className={`${cn}__creator-brief`} Element={Link} to={`/creator/${list.creator.slug}/`} />
            <Button type="link" primary to={list.link} wide target="_blank">
              Original URL
            </Button>
            {list.listTags && (
              <div className={`${cn}__tags`}>
                <h2>Categories</h2>
                <Font level="delta" className={`${cn}__tag-list`}>
                  {list.listTags.map(tag => (
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
            <h2>Games</h2>
            <ol className={`${cn}__game-list`}>
              {list.gameLink.map(({title, bggId}, index) => (
                <li key={index}>
                  <div className={`${cn}__game-title`}>{title}</div>
                  <GameMini className={`${cn}__game-info`} game={games.find(game => game.bggId == bggId)} basePath={basePath} />
                </li>
              ))}
            </ol>
          </>
        ),
      }} />
  )
}

export default ListView
