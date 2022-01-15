import React from "react"
import { graphql } from 'gatsby'

import Breadcrumbs from "layout/Breadcrumbs"
import Page from 'layout/Page'

import CreatorAdminView from 'views/CreatorAdmin'
import ContentfulCreatorList from 'components/ContentfulCreatorList'

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'Creator', url: '/admin/creator/'}
]

const AdminCreatorPage = ({location}) => {
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <Breadcrumbs locations={crumbs} />
      <h1 className={`${baseCn}__title`}>Create new creator</h1>
      <CreatorAdminView Element="section" className={`${baseCn}__main`} />
      <section className={`${baseCn}__summary`}>
        <ContentfulCreatorList />
      </section>
    </Page>
  )
}

export default AdminCreatorPage
