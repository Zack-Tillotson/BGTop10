import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'
import Game from 'views/Game'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata
  const game = data.graphCmsGame
  
  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}, {display: game.name, url: location.pathname}]}>
      <Game game={game} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query ListGamePageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    graphCmsGame {
      bggId
      artist
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
      listGameLink {
        id
        title
        list {
          description {
            markdown
          }
          image
          link
          name
          slug
          creator {
            slug
            name
            link
            imageBanner
            imageAvatar
            description
          }
        }
      }
    }
  }
`

export default ListPage
