import * as React from "react"

import Font from 'atoms/Font'
import ListMini from 'components/ListMini'

import useList from 'contentful/useList'

import './contentful-list-list.scss'

const baseCn = 'contentful-list-list'

const ContentfulListList = () => {
  const {cmsList} = useList(true)

  return (
    <section className={baseCn}>
      <h3>Lists</h3>
      <Font level="delta">
        <strong>Count:</strong> {cmsList.length}
      </Font>
      {cmsList.map(list => (
        <ListMini key={list.slug} list={list} to={`/admin/list/${list.slug}/`} />
      ))}
    </section>
  )
}

export default ContentfulListList
