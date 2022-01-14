import * as React from 'react'

import ListMini from 'components/ListMini'
import './component.scss'

const baseCn = 'lists-box'

function ListsBox({lists, getListTo}) {
  return (
    <div className={baseCn}>
      {lists.map(list => (
        <ListMini key={list.slug} list={list} showCreator getListTo={getListTo} className={`${baseCn}__list`} />
      ))}
    </div>
  )
}

export default ListsBox