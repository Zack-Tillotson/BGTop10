import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'
import CreatorView from 'views/Creator'

const ListPage = ({location, data}) => {

  const {siteUrl} = data.site.siteMetadata
  const {creator} = data
  
  return (
    <Page siteUrl={siteUrl} location={location} crumbs={[{display: 'Home', url: '/'}, {display: creator.name, url: location.pathname}]}>
      <CreatorView creator={creator} basePath={location.pathname} />
    </Page>
  )
}

export const query = graphql`
  query CreatorPageQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    creator: contentfulCreator(slug: {eq: $slug}) {
      slug
      name
      link
      imageBanner
      imageAvatar
      description {
        description
      }
      list {
        description {
          description
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
