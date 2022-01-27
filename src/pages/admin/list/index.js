import React, { useState } from "react"

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
        <div className="admin__nav-list">
          <Button onClick={() => updateTab('new')} minimal className={tab === 'new' ? "admin__nav-item--active" : ''}>
            New
          </Button>
          |
          <Button onClick={() => updateTab('list')} minimal className={tab === 'list' ? "admin__nav-item--active" : ''}>
            Existing
          </Button>
        </div>
      {tab === 'new' && (
        <ListAdminView Element="section" />
      )}
      {tab === 'list' && (
        <ContentfulListList />
      )}
      </section>
    </Page>
  )
}

export default AdminCreatorPage