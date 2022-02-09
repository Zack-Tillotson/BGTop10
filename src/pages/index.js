import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import HomeView from 'views/Home'

const IndexPage = ({location, data}) => {

  const {tags} = data.allContentfulTag
  const {lists} = data.allContentfulList


  return (
    <Page location={location}>
      <Helmet>
        <title>Cardboard Salad</title>
      </Helmet>
      <h1 className="--screen-reader">
        Cardboard Salad
      </h1>
      <HomeView tags={tags} lists={lists} />
    </Page>
  )
}

export const query = graphql`
query IndexPageQuery {
  allContentfulTag(sort: {fields: display}) {
    tags: nodes {
      slug
      display
      pageSubtitle {
        pageSubtitle
      }
      icon
    }
  }
  allContentfulList(
    limit: 3
    sort: {fields: datePublished, order: DESC}
  ) {
    lists: nodes {
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
}
`

export default IndexPage
