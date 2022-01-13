import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'


import Page from 'layout/Page'
import ListView from 'views/List'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata
  const {list} = data
  
  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}, {display: list.name, url: location.pathname}]}>
      <Helmet>
        <title>{list.name} | Cardboard Salad</title>
      </Helmet>
      <ListView list={list} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query ListPageQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    list: contentfulList(slug: {eq: $slug}) {
      slug
      description {
        description
      }
      image
      link
      name
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
`

export default ListPage
