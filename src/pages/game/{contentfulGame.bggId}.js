import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'


import Page from 'layout/Page'
import Game from 'views/Game'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata
  const {game, allContentfulList: {lists}} = data
  
  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}, {display: game.name, url: location.pathname}]}>
      <Helmet>
        <title>{game.name} | Cardboard Salad</title>
        <meta name="description" content={`Learn more about ${game.name}`} />
      </Helmet>
      <Game game={game} lists={lists} basePath={location.pathname} />
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
    }
    allContentfulList(filter: {games: {elemMatch: {bggId: {eq: $bggId}}}}) {
      lists: nodes {
        image
        name
        link
        slug
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

export default ListPage
