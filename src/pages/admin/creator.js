import React, {useState} from "react"
import { Link, graphql } from 'gatsby'

import Font from 'atoms/Font'
import Page from 'layout/Page'

import CreatorAdminView from 'views/CreatorAdmin'

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'Creator', url: '/admin/creator/'}
]

const AdminCreatorPage = ({location, data}) => {
  const {nodes: creators, totalCount} = data.creators
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <h1 className={`${baseCn}__title`}>Creators</h1>
      <CreatorAdminView Element="section" className={`${baseCn}__main`} />
      <section className={`${baseCn}__summary`}>
        <h3>Live Creators</h3>
        <Font level="delta">
          <strong>Total Count:</strong> {totalCount}
        </Font>
        <div className={`${baseCn}__summary-list`}>
          {creators.map(creator => (
            <div key={creator.slug}>
              <Link to={`/creator/${creator.slug}/`}>{creator.name}</Link>
            </div>
          ))}
        </div>
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
    creators: allContentfulCreator {
      nodes {
        slug
        name
      }
      totalCount
    }
  }
`

export default AdminCreatorPage
