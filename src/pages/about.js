import * as React from "react"
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import Button from 'atoms/Button'

const ContactUsPage = ({location, data}) => {

  return (
    <Page location={location}>
      <Helmet>
        <title>About - Cardboard Salad</title>
      </Helmet>
      <h1>
        About
      </h1>
      <section>
        <p>
          Cardboard SALAD connects board gamers with board games through your favorite content creators. We want you to find amazing games, board game channels to get as much exposure as possible, and everyone to have fun.
        </p>
      </section>
    </Page>
  )
}

export default ContactUsPage
