import React, { useState } from "react"
import { graphql } from 'gatsby'

import Button from 'atoms/Button'
import Page from 'layout/Page'
import Breadcrumbs from "layout/Breadcrumbs"

import ListAdminView from 'views/ListAdmin'
import ContentfulListList from 'components/ContentfulListList'

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'List', url: '/admin/list/'}
]

const AdminCreatorPage = ({location}) => {
  const [tab, updateTab] = useState('new')
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <section className={`${baseCn}__main`}>
        <Breadcrumbs locations={crumbs} />
        <Button primary={tab === 'new'} onClick={() => updateTab('new')} tight>New</Button>
        <Button primary={tab === 'list'} onClick={() => updateTab('list')} tight>Existing</Button>
      {tab === 'new' && (
        <>
          <h1 className={`${baseCn}__title`}>Create new list</h1>
          <ListAdminView Element="section" />
        </>
      )}
      {tab === 'list' && (
        <>
          <h1 className={`${baseCn}__title`}>Select list to edit</h1>
          <ContentfulListList />
        </>
      )}
      </section>
    </Page>
  )
}

export default AdminCreatorPage