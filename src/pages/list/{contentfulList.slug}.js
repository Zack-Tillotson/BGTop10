import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import useListGames from 'useListGames'

import Page from 'layout/Page'
import ListView from 'views/List'


const ListPage = ({location, data}) => {

  const {list} = data
  const games = useListGames(list)
  
  return (
    <Page location={location} crumbs={[{display: 'Home', url: '/'}, {display: list.name, url: location.pathname}]}>
      <Helmet>
        <title>{list.name} | Cardboard Salad</title>
      </Helmet>
      <ListView list={list} games={games} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query ListPageQuery($slug: String!) {
    list: contentfulList(slug: {eq: $slug}) {
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
`

export default ListPage
