import * as React from "react"
import { Link, graphql } from "gatsby"
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import logoTitle from 'images/square-logo-256x256.png'

const NotFoundPage = ({location, data}) => {
  return (
    <Page siteUrl={data.site.siteMetadata.siteUrl + location.pathname} style={{textAlign: 'center'}}>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <h1>Page not found</h1>
      <img src={logoTitle} alt="Sorry couldn't find this page" />
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