import * as React from "react"
import { Link, graphql } from 'gatsby'
import {Helmet} from 'react-helmet'

import Page from 'layout/Page'

import TagBrief from 'components/TagBrief'

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
          <div key={tag.slug} style={{marginBottom: "10px"}}>
            <TagBrief Element={Link} tag={tag} to={`/${tag.slug}/`} className="tag-view__title" />
          </div>
        ))}
      </section>
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
    }
  }
}
`

export default IndexPage
