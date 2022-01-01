import React, {useState} from "react"
import { Link, graphql } from 'gatsby'

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Page from 'layout/Page'

import CreatorMini from 'components/CreatorMini'
import CreatorForm from 'components/CreatorForm'
import CreatorView from 'views/Creator'

import useContentful from 'contentful/useContentful'

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'Creator', url: '/admin/creator/'}
]

const AdminCreatorPage = ({location, data}) => {
  const {nodes: creators, totalCount} = data.creators
  const contentful = useContentful()
  const [isReview, updateIsReview] = useState(false)

  const isValid = 
    !!contentful.forms.creator.values.name
    && !!contentful.forms.creator.values.slug
    && !!contentful.forms.creator.values.avatar
    && !!contentful.forms.creator.values.banner

  const getFormCreator = () => {
    const {values} = contentful.forms.creator
    const ret = {
      name: values.name,
      slug: values.slug,
      description: {
        description: values.description || '',
      },
      link: (values.links || '').split(',').map(link => link.trim()),
      imageAvatar: values.avatar,
      imageBanner: values.banner,
      list: [],
    }

    return ret
  }

  const handleReviewClick = event => {
    updateIsReview(true)
  }

  const handleClearClick = event => {
    contentful.forms.creator.handleClear()
  }

  const handleCancelClick = event => {
    updateIsReview(false)
  }

  const handleSaveClick = event => {
    contentful.forms.creator.handleSubmit()
  }
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <h1 className={`${baseCn}__title`}>Creators</h1>
      <section className={`${baseCn}__main`}>
        <h3>Add new creator</h3>
        {!isReview && (
          <CreatorForm />
        )}
        {!isReview && (
          <Button onClick={handleReviewClick} primary disabled={!isValid}>Review and save</Button>
        )}
        {!isReview && (
          <Button onClick={handleClearClick} minimal>Clear</Button>
        )}
        {isReview && (
          <CreatorMini creator={getFormCreator()} />
        )}
        {isReview && (
          <CreatorView creator={getFormCreator()} />
        )}
        {isReview && (
          <Button onClick={handleCancelClick} hollow>Cancel</Button>
        )}
        {isReview && (
          <Button onClick={handleSaveClick} primary>Save</Button>
        )}
      </section>
      <section className={`${baseCn}__summary`}>
        <h3>Current</h3>
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
