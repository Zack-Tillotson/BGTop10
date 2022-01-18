import * as React from "react"
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import Button from 'atoms/Button'

const ContactUsPage = ({location, data}) => {

  return (
    <Page location={location}>
      <Helmet>
        <title>Contact us - Cardboard Salad</title>
      </Helmet>
      <h1>
        Contact us
      </h1>
      <section>
        <p>
          For help or business inquries please use our email: 
          <Button type="anchor" href="mailto:boardgameSALADcom@gmail.com" minimal>boardgameSALADcom@gmail.com</Button>
        </p>
      </section>
    </Page>
  )
}

export default ContactUsPage
