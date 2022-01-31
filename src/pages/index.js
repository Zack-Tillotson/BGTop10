import * as React from "react"
import { Link, graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import useListGames from "useListGames"

import Page from 'layout/Page'
import MetaView from 'views/Meta'

const IndexPage = ({location, data}) => {

  return (
    <Page location={location}>
      <Helmet>
        <title>Cardboard Salad</title>
      </Helmet>
      <h1 className="--screen-reader">
        Cardboard Salad
      </h1>
      <section>
        <h2>Board game lists</h2>
        {data.allContentfulTag.tags.map(tag => (
          <div>
            <Link to={`/${tag.slug}/`}>{tag.display}</Link>
          </div>
        ))}
      </section>
    </Page>
  )
}

export const query = graphql`
query IndexPageQuery {
  allContentfulTag {
    tags: nodes {
      slug
      display
      pageSubtitle {
        pageSubtitle
      }
    }
  }
}

`

export default IndexPage
