import * as React from 'react'

import ListMini from 'components/ListMini'
import './component.scss'

const baseCn = 'lists-box'

function ListsBox({lists}) {
  return (
    <div className={baseCn}>
      {lists.map(list => (
        <ListMini key={list.slug} list={list} showCreator className={`${baseCn}__list`} />
      ))}
    </div>
  )
}

export default ListsBox