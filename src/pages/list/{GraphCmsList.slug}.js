import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'
import ListView from 'views/List'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata

  const list = data.allGraphCmsList.nodes[0]
  
  return (
    <Page siteUrl={siteUrl} location={location}>
      <ListView list={list} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query ListPageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allGraphCmsList {
      nodes {
        description {
          markdown
        }
        image
        link
        creator {
          slug
          name
          link
          imageBanner
          imageAvatar
          description
        }
        listGameLink {
          id
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
        name
        slug
      }
    }
  }
`

export default ListPage
