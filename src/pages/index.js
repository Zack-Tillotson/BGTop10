import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'

import GameMini from 'components/GameMini'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

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
    <Page siteUrl={siteUrl} location={location}>
      <Helmet>
        <title>Cardboard Salad</title>
      </Helmet>
      <h1 className="--screen-reader">
        Cardboard Salad
      </h1>
      <section>
        <CreatorPills creators={creators} />
      </section>
      <section>
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
