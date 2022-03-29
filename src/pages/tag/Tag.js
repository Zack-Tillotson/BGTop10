import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import TagView from 'views/Tag'

const baseCn = 'tag-page'

const TagPage = ({location, data}) => {

  const {tag, allContentfulList: {lists}} = data
  
  React.useEffect(() => {
    if(location.hash) {
      try {
        document.getElementById(location.hash.slice(1)).scrollIntoView(false)
      } catch(e) {}
    }
  }, [location])

  if(!tag) return null
  
  return (
    <Page location={location}>
      <Helmet>
        <title>{tag.pageTitle} | Cardboard Salad</title>
        <meta name="description" content={tag.pageSubtitle.pageSubtitle} />
      </Helmet>
      <TagView tag={tag} lists={lists} />
    </Page>
  )
}

export const query = graphql`
  query TagPageQuery($slug: String = "") {
    tag: contentfulTag(slug: {eq: $slug}) {
      pageTitle
      slug
      display
      icon
      priority
      pageSubtitle {
        pageSubtitle
      }
      introduction {
        introduction
      }
    }
    allContentfulList(
      limit: 21
      sort: {fields: datePublished, order: DESC}
      filter: {listTags: {elemMatch: {slug: {eq: $slug}}}}
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

export default TagPage
