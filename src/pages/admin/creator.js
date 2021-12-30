import * as React from "react"
import { Link, graphql } from 'gatsby'

import Font from 'atoms/Font'
import Page from 'layout/Page'

import CreatorMini from 'components/CreatorMini'
import CreatorForm from 'components/CreatorForm'

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
      <section className={`${baseCn}__main`}>
        <h3>Add new creator</h3>
        <CreatorForm />
      </section>
      <section className={`${baseCn}__summary`}>
        <h3>Current</h3>
        <Font level="delta">
          <strong>Total Count:</strong> {totalCount}
        </Font>
        <div className={`${baseCn}__summary-list`}>
          {creators.map(creator => (
            <div>
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
        link
        imageBanner
        imageAvatar
        description {
          description
        }
        list {
          description {
            description
          }
          image
          link
          name
          slug
        }
      }
      totalCount
    }
  }
`

export default AdminCreatorPage
