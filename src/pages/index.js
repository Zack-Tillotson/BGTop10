import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'

import GameMini from 'components/GameMini'
import ListMini from 'components/ListMini'
import CreatorMini from 'components/CreatorMini'

const IndexPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata

  const lists = data.lists.nodes
  const games = Object.values(lists.reduce((gameMap, list) => ({
    ...gameMap,
    ...list.games.reduce((aGameMap, game) => ({
      ...aGameMap,
      [game.bggId]: game,
    }), {}),
  }), {}))
  const creators = Object.values(lists.reduce((map, list) => ({
    ...map,
    [list.creator.slug]: list.creator,
  }), {}))

  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}]}>
      <title>BG Top 10 Homepage</title>
      <h1 className="--screen-reader">
        BG Top 10 Homepage
      </h1>
      <section>
        <h2>New lists</h2>
        <ul>
          {lists.map(list => (
            <li key={list.slug}>
              <ListMini list={list} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Hot games</h2>
        <ul>
          {games.sort(() => Math.random()-.5).slice(0, 10).map(game => (
            <li key={game.bggId}>
              <GameMini game={game} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Popular creators</h2>
        <ul>
          {creators.sort(() => Math.random() - .5).slice(0, 10).map(creator => (
            <li key={creator.slug}>
              <CreatorMini creator={creator} wide />
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}

export const query = graphql`
query IndexPageQuery {
  site {
    siteMetadata {
      siteUrl
    }
  }
  lists: allContentfulList(limit: 20, sort: {fields: updatedAt, order: DESC}) {
    nodes {
      slug
      description {
        description
      }
      image
      link
      name
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
      games {
        artist
        bggId
        designer
        family
        image
        imageThumbnail
        mechanic
        name
        playerCountMax
        playerCountMin
        publisher
        yearPublished
      }
      gameLink {
        title
        bggId
      }
    }
  }
}

`

export default IndexPage
