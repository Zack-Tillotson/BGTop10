import * as React from "react"
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import CreatorBrief from 'components/CreatorBrief'

import useCreator from 'contentful/useCreator'

import './contentful-creator-list.scss'

const baseCn = 'contentful-creator-list'

const ContentfulCreatorList = () => {
  const {cmsList} = useCreator(true)

  return (
    <section className={baseCn}>
      <h3>Creators</h3>
      <Font level="delta">
        <strong>Count:</strong> {cmsList.length}
      </Font>
      {cmsList.map(creator => (
        <CreatorBrief key={creator.slug} creator={creator} Element={Link} to={`/admin/creator/${creator.slug}/`} />
      ))}
    </section>
  )
}

export default ContentfulCreatorList
