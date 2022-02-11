import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import CreatorView from 'views/Creator'

const ListPage = ({location, data}) => {

  const {creator, allContentfulList: {lists}} = data

  const tagMap = {}
  lists.forEach(list => list.listTags.forEach(tag => tagMap[tag.slug] = tag))
  const tags = Object.values(tagMap)
  
  return (
    <Page location={location} crumbs={[{display: 'Home', url: '/'}, {display: creator.name, url: location.pathname}]}>
      <Helmet>
        <title>{creator.name} | Cardboard Salad</title>
      </Helmet>
      <CreatorView creator={creator} lists={lists} basePath={location.pathname} tags={tags} />
    </Page>
  )
}

export const query = graphql`
  query CreatorPageQuery($slug: String!) {
    creator: contentfulCreator(slug: {eq: $slug}) {
      slug
      name
      link
      imageBanner
      imageAvatar
      description {
        description
      }
    }
    allContentfulList(filter: {creator: {slug: {eq: $slug}}}, sort: {fields: datePublished, order: DESC}) {
      lists: nodes {
        image
        name
        link
        slug
        datePublished
        listTags {
          slug
          display
          pageSubtitle {
            pageSubtitle
          }
          icon
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

export default ListPage
