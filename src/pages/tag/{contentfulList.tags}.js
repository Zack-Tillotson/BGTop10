import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'

import ListsBox from 'components/ListsBox'

const TagPage = ({location, pageContext, data}) => {

  const lists = data.lists.nodes
  
  return (
    <Page location={location}>
      <Helmet>
        <title>Cardboard Salad</title>
      </Helmet>
      <h1 className="--screen-reader">
        Cardboard Salad
      </h1>
      <section>
        <h2>Board game lists tagged with {pageContext.tags.map(tag => `"${tag}"`).join(' & ')} </h2>
        <ListsBox lists={lists} />
      </section>
    </Page>
  )
}

export const query = graphql`
  query TagPageQuery($tags: [String]!) {
    lists: allContentfulList(
      limit: 21
      sort: {fields: datePublished, order: DESC}
      filter: {tags: {in: $tags}}
    ) {
      nodes {
        slug
        description {
          description
        }
        image
        link
        name
        datePublished
        tags
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

export default TagPage
