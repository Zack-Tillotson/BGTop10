import * as React from "react"

import Button from 'atoms/Button'
import Font from 'atoms/Font'

import Page from 'layout/Page'

import useContentful from 'contentful/useContentful'

import './admin.scss'

const AdminIndexPage = () => {
  const contentful = useContentful()

  const handleAccessTokenChange = event => contentful.handleAccessTokenChange(event.target.value)

  return (
    <Page crumbs={[{display: 'Home', url: '/'}, {display: 'Admin', url: '/admin/'}]}>
      <title>BG Top 10 Admin</title>
      <h1 className="--screen-reader">
        BG Top 10 Admin
      </h1>
      <section>
        <h3>Pages</h3>
        <ol>
          <li><Button type="link" to="creator" primary>Creator</Button> - Add a creator</li>
          <li><Button type="link" to="list" primary>List</Button> - Add a list, must have creator beforehand</li>
        </ol>
      </section>
      <section>
        <h3>Contentful API</h3>
        <div className="admin__input-group">
          <Font
            Ele="label"
            level="delta"
            htmlFor="access-token-input"
            className="admin__input-label">
              Access Token
          </Font>
          <input 
            id="access-token-input" 
            type="text" 
            value={contentful.accessToken} 
            onChange={handleAccessTokenChange} 
            className="admin__input" />
        </div>
      </section>
    </Page>
  )
}

export default AdminIndexPage
