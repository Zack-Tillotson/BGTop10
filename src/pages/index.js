import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'

const IndexPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata

  const lists = data.allGraphCmsList.nodes
  const games = data.allGraphCmsGame.nodes
  const creators = data.allGraphCmsCreator.nodes

  return (
    <Page siteUrl={siteUrl} location={location}>
      <title>BG Top 10 Homepage</title>
      <h1 className="--screen-reader">
        BG Top 10 Homepage
      </h1>
      <section>
        <h2>New lists</h2>
        <ul>
          {lists.map(list => (
            <li key={list.id}>
              {list.name} by {list.creator.name}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Hot games</h2>
        <ul>
          {games.map(game => (
            <li key={game.bggId}>
              {game.name} by ({game.yearPublished})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Popular creators</h2>
        <ul>
          {creators.map(creator => (
            <li key={creator.id}>
              {creator.name}
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
    allGraphCmsList(sort: {order: DESC, fields: createdAt}) {
      nodes {
        id
        description {
          markdown
        }
        imageThumbnail
        link
        name
        creator {
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
    allGraphCmsGame(
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
    allGraphCmsCreator(sort: {fields: list___publishedAt, order: DESC}) {
      nodes {
        id
        imageAvatar
        imageBanner
        name
        description
      }
    }
  }
`

export default IndexPage
