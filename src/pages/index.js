import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'

import GameMini from 'components/GameMini'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

const IndexPage = ({location, data}) => {

  const lists = data.lists.nodes
  const gameMap = {}
  lists.forEach(list => list.games.forEach(game => {
    gameMap[game.bggId] = gameMap[game.bggId] || {game, count: 0}
    gameMap[game.bggId].count++
  }))
  const games = Object.values(gameMap).sort((a, b) => b.count - a.count).map(item => item.game)

  const creatorMap = {}
  lists.forEach(({creator}) => {
    creatorMap[creator.slug] = creatorMap[creator.slug] || {creator, count: 0}
    creatorMap[creator.slug].count++
  })
  const creators = Object.values(creatorMap).sort((a, b) => b.count - a.count).map(item => item.creator)

  return (
    <Page location={location}>
      <Helmet>
        <title>Cardboard Salad</title>
      </Helmet>
      <h1 className="--screen-reader">
        Cardboard Salad
      </h1>
      <section>
        <h4>Popular creators</h4>
        <CreatorPills creators={creators} />
      </section>
      <section>
        <h2>Check out these game lists</h2>
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
  lists: allContentfulList(limit: 20, sort: {fields: datePublished, order: DESC}) {
    nodes {
      slug
      description {
        description
      }
      image
      link
      name
      datePublished
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
