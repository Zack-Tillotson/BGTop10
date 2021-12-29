import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'
import CreatorView from 'views/Creator'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata
  const creator = data.graphCmsCreator
  
  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}, {display: creator.name, url: location.pathname}]}>
      <CreatorView creator={creator} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query CreatorPageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    graphCmsCreator {
      slug
      name
      link
      imageBanner
      imageAvatar
      description
      list {
        description {
          markdown
        }
        image
        link
        name
        slug
      }
    }
  }
`

export default ListPage
