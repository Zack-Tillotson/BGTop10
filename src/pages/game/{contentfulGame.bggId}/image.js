import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'

const ListPage = ({location, data}) => {

  const {game} = data
  
  return (
    <Page location={location} crumbs={[{display: 'Home', url: '/'}, {display: game.name, url: `/game/${game.bggId}/`}]}>
      <Helmet>
        <title>{game.name} Image | Cardboard Salad</title>
      </Helmet>
      <img src={game.image} alt={game.name} />
    </Page>
  )
}

export const query = graphql`
  query ListGameImagePageQuery($bggId: Int!) {
    game: contentfulGame(bggId: {eq: $bggId}) {
      bggId,
      name,
      image
    }
  }
`

export default ListPage
