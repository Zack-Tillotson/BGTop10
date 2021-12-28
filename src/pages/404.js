import * as React from "react"
import { Link, graphql } from "gatsby"

import Page from 'layout/Page'

const NotFoundPage = ({location, data}) => {
  return (
    <Page siteUrl={data.site.siteMetadata.siteUrl + location.pathname}>
      <title>Not found</title>
      <h1>Page not found</h1>
      <Link href="/">Home</Link>
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

export default NotFoundPage