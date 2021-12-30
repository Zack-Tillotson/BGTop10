import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'
import Game from 'views/Game'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata
  const {game} = data
  
  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}, {display: game.name, url: location.pathname}]}>
      <Game game={game} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query ListGamePageQuery($bggId: Int!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    game: contentfulGame(bggId: {eq: $bggId}) {
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
        list {
          name
          creator {
            slug
            name
            imageBanner
            imageAvatar
            description {
              description
            }
          }
          image
          link
        }
        title
        id
      }
    }
  }
`

export default ListPage
