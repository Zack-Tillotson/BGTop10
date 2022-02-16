import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import SearchView from 'views/search'

const SearchPage = ({location, data}) => {

  const query = new URLSearchParams(location.search).get('q') || ''
  const {allContentfulGame: {games}} = data
  
  return (
    <Page location={location}>
      <Helmet>
        <title>Search | Cardboard Salad</title>
      </Helmet>
      <SearchView query={query} games={games} />
    </Page>
  )
}

export const query = graphql`
  query SearchPage {
    allContentfulGame {
      games: nodes {
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
    }
  }
`

export default SearchPage
