import * as React from "react"
import { graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'
import HomeView from 'views/Home'

import useListGames from 'useListGames'

const IndexPage = ({location, data}) => {

  const {tags} = data.allContentfulTag
  const {lists: recents} = data.recentLists
  const {lists: allLists} = data.allLists
  const {creators} = data.allContentfulCreator

  return (
    <Page location={location}>
      <Helmet>
        <title>Cardboard Salad</title>
      </Helmet>
      <h1 className="--screen-reader">
        Cardboard Salad
      </h1>
      <HomeView tags={tags} recentLists={recents} allLists={allLists} creators={creators} />
    </Page>
  )
}

export const query = graphql`
query IndexPageQuery {
  allContentfulTag(sort: {fields: display}) {
    tags: nodes {
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
  }
  recentLists : allContentfulList(
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
  allLists: allContentfulList {
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
  allContentfulCreator(sort: {fields: slug, order: ASC}, limit: 5) {
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

export default IndexPage
