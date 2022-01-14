import * as React from "react"

import Font from 'atoms/Font'
import ListsBox from 'components/ListsBox'

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
      <ListsBox lists={cmsList} getListTo={list => `/admin/list/${list.slug}/`} />
      
    </section>
  )
}

export default ContentfulListList
