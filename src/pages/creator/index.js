import * as React from "react"
import { Link, graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import CreatorBrief from "components/CreatorBrief"

const baseCn = 'creator-page'

const ListPage = ({location, data}) => {

  const {creators} = data.allContentfulCreator
  
  return (
    <Page location={location}>
      <Helmet>
        <title>Creators | Cardboard Salad</title>
      </Helmet>
      <h1>Channels</h1>
      <div className={`${baseCn}__list`}>
        {creators.map(creator=> (
          <CreatorBrief
            key={creator.slug} 
            Element={Link}
            to={`/creator/${creator.slug}/`}
            creator={creator}
            className={`${baseCn}__creator`} />
        ))}
      </div>
    </Page>
  )
}

export const query = graphql`
  query CreatorsPageQuery {
    allContentfulCreator(sort: {fields: slug, order: ASC}) {
      creators: nodes {
        slug
        name
        link
        imageBanner
        imageAvatar
        description {
          description
        }
      }
    }
  }
`

export default ListPage
