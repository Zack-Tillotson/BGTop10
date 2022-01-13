import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'


import Page from 'layout/Page'
import Game from 'views/Game'

const ListPage = ({location, data}) => {

  const {game, allContentfulList: {lists}} = data
  
  return (
    <Page location={location} crumbs={[{display: 'Home', url: '/'}, {display: game.name, url: location.pathname}]}>
      <Helmet>
        <title>{game.name} | Cardboard Salad</title>
      </Helmet>
      <Game game={game} lists={lists} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query ListGamePageQuery($bggId: Int!) {
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
      description {
        description
      }
      playTimeMin
      playTimeMax
      playTimeAvg
    }
    allContentfulList(filter: {games: {elemMatch: {bggId: {eq: $bggId}}}}, sort: {fields: datePublished, order: DESC}) {
      lists: nodes {
        image
        name
        link
        slug
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

export default ListPage
