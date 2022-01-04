import React from "react"
import { graphql } from 'gatsby'

import Font from 'atoms/Font'
import Page from 'layout/Page'

import ListAdminView from 'views/ListAdmin'
import ContentfulCreatorList from 'components/ContentfulCreatorList'

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'List', url: '/admin/list/'}
]

const AdminCreatorPage = ({location, data}) => {
  const {totalCount} = data.lists
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <h1 className={`${baseCn}__title`}>Create new list</h1>
      <ListAdminView Element="section" className={`${baseCn}__main`} />
      <section className={`${baseCn}__summary`}>
        <h3>Live Lists</h3>
        <Font level="delta">
          <strong>Count:</strong> {totalCount}
        </Font>
        {/* <ContentfulCreatorList /> */}
      </section>
    </Page>
  )
}

export const query = graphql`
  query AdminListPageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    lists: allContentfulList {
      totalCount
    }
  }
`

export default AdminCreatorPage
