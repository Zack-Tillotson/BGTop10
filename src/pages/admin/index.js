import React, {useState} from "react"
import {Link} from 'gatsby'
import { Helmet } from "react-helmet"

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import TitleRow from 'atoms/TitleRow'
import Card from 'atoms/Card'

import Page from 'layout/Page'
import Breadcrumbs from "layout/Breadcrumbs"

import useAccessToken from 'contentful/useAccessToken'

import './admin.scss'

const crumbs= [{display: 'Home', url: '/'}, {display: 'Admin', url: '/admin/'}]

const AdminIndexPage = () => {
  const accessToken = useAccessToken()
  const [isAccessTokenOpen, updateIsAccessTokenOpen] = useState(!accessToken)

  const handleAccessTokenChange = event => accessToken.updateValue(event.target.value)
  const handleOpenAccessTokenToggle = event => updateIsAccessTokenOpen(true)

  return (
    <Page className="admin__nav">
      <Helmet>
        <title>Admin | CardboardSALAD</title>
      </Helmet>
      <h1 className="--screen-reader">
        CardboardSALAD Admin
      </h1>
      <Breadcrumbs locations={crumbs} />
      <section className="admin__nav-section">
        <h3>Navigation</h3>
        <ul className="admin__nav-link-list">
          <li>
            <Link to="creator" className="admin__nav-link">
              <div className="admin__nav-title">Creator</div>
              <div className="admin__nav-logo">🧍</div>
              <Font level="delta" className="admin__nav-desc">Add/Edit a creator</Font>
            </Link>
          </li>
          <li>
            <Link to="game" className="admin__nav-link">
              <div className="admin__nav-title">Games</div>
              <div className="admin__nav-logo">🎲</div>
              <div className="admin__nav-desc">Edit a game</div>
            </Link>
          </li>
          <li>
            <Link to="list" className="admin__nav-link">
              <div className="admin__nav-title">List</div>
              <div className="admin__nav-logo">☷</div>
              <div className="admin__nav-desc">Add a list</div>
            </Link>
          </li>
        </ul>
      </section>
      <Card Element="section">
        <TitleRow Element="h3" title="Contentful API">
          {!isAccessTokenOpen && (
            <Button onClick={handleOpenAccessTokenToggle} minimal>• change token</Button>
          )}
        </TitleRow>
        
        {isAccessTokenOpen && (
          <div className={`admin__access-token-toggle`}>
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
                value={accessToken.value} 
                onChange={handleAccessTokenChange} 
                className="admin__input" />
            </div>
          </div>
        )}
      </Card>
    </Page>
  )
}

export default AdminIndexPage
