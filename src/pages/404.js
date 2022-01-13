import * as React from "react"
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import logoTitle from 'images/square-logo-256x256.png'

const NotFoundPage = () => {
  return (
    <Page style={{textAlign: 'center'}}>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <h1>Page not found</h1>
      <img src={logoTitle} alt="Sorry couldn't find this page" />
    </Page>
  )
}

export default NotFoundPage