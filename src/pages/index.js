import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import useListGames from "useListGames"

import Page from 'layout/Page'

import GameMini from 'components/GameMini'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

const IndexPage = ({location, data}) => {

  const allGames = useListGames()

  const lists = data.lists.nodes
  const gameMap = {}
  lists.forEach(list => list.gameLink.forEach(game => {
    gameMap[game.bggId] = gameMap[game.bggId] || {game, count: 0}
    gameMap[game.bggId].count++
  }))
  const games = Object.values(gameMap)
    .sort((a, b) => b.count - a.count)
    .map(link => allGames.find(game => game.bggId === link.game.bggId))

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
  lists: allContentfulList(limit: 21, sort: {fields: datePublished, order: DESC}) {
    nodes {
      slug
      description {
        description
      }
      image
      link
      name
      datePublished
      tags
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

export default IndexPage
