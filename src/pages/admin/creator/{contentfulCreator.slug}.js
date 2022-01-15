import React from "react"
import { graphql } from 'gatsby'

import Breadcrumbs from "layout/Breadcrumbs"
import Page from 'layout/Page'

import CreatorAdminView from 'views/CreatorAdmin'
import CreatorBrief from "components/CreatorBrief"

const baseCn = 'admin'

const AdminCreatorEditPage = ({location, data}) => {
  const crumbs = [
    {display: 'Home', url: '/'}, 
    {display: 'Admin', url: '/admin/'}, 
    {display: 'Creator', url: '/admin/creator/'},
    {display: data.creator.name, url: `/admin/creator/${data.creator.slug}/`},
  ]
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <Breadcrumbs locations={crumbs} />
      <h1 className={`${baseCn}__title`}>Create new creator</h1>
      <CreatorAdminView Element="section" className={`${baseCn}__main`} editTarget={data.creator} />
      <section className={`${baseCn}__summary`}>
        <CreatorBrief creator={data.creator} />
      </section>
    </Page>
  )
}

export const query = graphql`
  query AdminCreatorEditQuery($slug: String) {
    creator: contentfulCreator(slug: {eq: $slug}) {
      slug
      name
      imageBanner
      imageAvatar
      link
      description {
        description
      }
    }
  }
`

export default AdminCreatorEditPage
