import * as React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'

const IndexPage = ({location, data}) => {
  return (
    <Page siteUrl={data.site.siteMetadata.siteUrl + location.pathname}>
      <title>BG Top 10</title>
      <h1>
        BG Top 10
      </h1>
    </Page>
  )
}

export const query = graphql`
  query ErrorPageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default IndexPage
