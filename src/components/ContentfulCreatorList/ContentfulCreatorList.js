import * as React from "react"

import Font from 'atoms/Font'

import useCreator from 'contentful/useCreator'

import './contentful-creator-list.scss'

const baseCn = 'contentful-creator-list'

const ContentfulCreatorList = () => {
  const {cmsList} = useCreator(true)

  return (
    <section className={baseCn}>
      <h3>CMS Creators</h3>
      <Font level="delta">
        <strong>Count:</strong> {cmsList.length}
      </Font>
      {cmsList.map(creator => (
        <div key={creator.slug}>
          {creator.name}
        </div>
      ))}
    </section>
  )
}

export default ContentfulCreatorList
