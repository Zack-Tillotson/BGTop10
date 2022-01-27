import React from "react"
import { graphql } from 'gatsby'

import Breadcrumbs from "layout/Breadcrumbs"
import Page from 'layout/Page'

import ListAdminView from 'views/ListAdmin'

const baseCn = 'admin'

const AdminListEditPage = ({location, data}) => {
  const {list} = data

  const crumbs = [
    {display: 'Home', url: '/'}, 
    {display: 'Admin', url: '/admin/'}, 
    {display: 'List', url: '/admin/list/'},
    {display: list.name, url: '/admin/list/${list.slug}'},
  ]
  
  return (
    <Page className={baseCn} location={location}>
      <Breadcrumbs locations={crumbs} />
      <section className={`${baseCn}__main`}>
        <h1 className={`${baseCn}__title`}>Edit list</h1>
        <ListAdminView Element="section" editTarget={list} />
      </section>
    </Page>
  )
}

export const query = graphql`
  query AdminEditListPageQuery($slug: String!) {
    list: contentfulList(slug: {eq: $slug}) {
      slug
      description {
        description
      }
      image
      link
      name
      datePublished
      listTags {
        display
        slug
      }
      creator {
        slug
        name
        link
        imageBanner
        imageAvatar
        description {
          description
        }
      }
      gameLink {
        title
        bggId
      }
    }
  }
`

export default AdminListEditPage