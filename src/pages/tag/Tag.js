import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import useListGames from 'useListGames'

import Page from 'layout/Page'
import TagView from 'views/Tag'

const baseCn = 'tag-page'

const TagPage = ({location, data}) => {

  const {tag} = data
  const allGames = useListGames()

  if(!tag) return null

  const lists = data.lists.nodes
  const gameMap = {}
  lists.forEach(list => list.gameLink.forEach((game, index, {length: linkCount}) => {
    gameMap[game.bggId] = gameMap[game.bggId] || {game, count: 0}
    gameMap[game.bggId].count += (linkCount - index)/linkCount*10 // 10-1 pt, 10 for a top 10% 1 for a 90% of list
  }))
  const games = Object.values(gameMap)
    .sort((a, b) => b.count - a.count)
    .map(link => ({...allGames.find(game => game.bggId === link.game.bggId), count: link.count}))

  const creatorMap = {}
  lists.forEach(({creator}) => {
    creatorMap[creator.slug] = creatorMap[creator.slug] || {creator, count: 0}
    creatorMap[creator.slug].count++
  })
  const creators = Object.values(creatorMap).sort((a, b) => b.count - a.count).map(item => item.creator)
  
  return (
    <Page location={location}>
      <Helmet>
        <title>{tag.pageTitle} | Cardboard Salad</title>
      </Helmet>
      <TagView tag={tag} creators={creators} games={games} lists={lists} />
    </Page>
  )
}

export const query = graphql`
  query TagPageQuery($slug: String = "") {
    tag: contentfulTag(slug: {eq: $slug}) {
      pageTitle
      slug
      display
      pageSubtitle {
        pageSubtitle
      }
      introduction {
        introduction
      }
    }
    lists: allContentfulList(
      limit: 21
      sort: {fields: datePublished, order: DESC}
      filter: {listTags: {elemMatch: {slug: {eq: $slug}}}}
    ) {
      nodes {
        slug
        description {
          description
        }
        image
        link
        name
        datePublished
        listTags {
          display
          slug
        }
        creator {
          slug
          name
          link
          imageBanner
          imageAvatar
          description {
            description
          }
        }
        gameLink {
          title
          bggId
        }
      }
    }
  }

`

export default TagPage