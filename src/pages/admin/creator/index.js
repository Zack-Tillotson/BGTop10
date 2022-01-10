import React from "react"
import { graphql } from 'gatsby'

import Font from 'atoms/Font'
import Page from 'layout/Page'

import CreatorAdminView from 'views/CreatorAdmin'
import ContentfulCreatorList from 'components/ContentfulCreatorList'

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'Creator', url: '/admin/creator/'}
]

const AdminCreatorPage = ({location, data}) => {
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <h1 className={`${baseCn}__title`}>Create new creator</h1>
      <CreatorAdminView Element="section" className={`${baseCn}__main`} />
      <section className={`${baseCn}__summary`}>
        <ContentfulCreatorList />
      </section>
    </Page>
  )
}

export const query = graphql`
  query AdminCreatorPageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default AdminCreatorPage
