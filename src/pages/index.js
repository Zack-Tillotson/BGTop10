import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'

import GameMini from 'components/GameMini'
import ListMini from 'components/ListMini'
import CreatorMini from 'components/CreatorMini'

const IndexPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata

  const lists = data.lists.nodes
  const games = data.games.nodes
  const creators = data.creators.nodes

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
          {games.map(game => (
            <li key={game.bggId}>
              <GameMini game={game} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Popular creators</h2>
        <ul>
          {creators.map(creator => (
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
    lists: allGraphCmsList(sort: {order: DESC, fields: createdAt}) {
      nodes {
        slug
        description {
          markdown
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
          description
        }
        listGameLink {
          title
          game {
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
        }
      }
    }
    games: allGraphCmsGame(
      sort: {order: DESC, fields: listGameLink___updatedAt}
      limit: 10
    ) {
      totalCount
      nodes {
        bggId
        name
        designer
        family
        artist
        image
        imageThumbnail
        playerCountMax
        playerCountMin
        publisher
        yearPublished
      }
    }
    creators: allGraphCmsCreator(sort: {fields: list___publishedAt, order: DESC}) {
      nodes {
        slug
        imageAvatar
        imageBanner
        name
        description
      }
    }
  }
`

export default IndexPage
