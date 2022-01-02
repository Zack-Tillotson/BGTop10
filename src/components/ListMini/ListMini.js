import * as React from "react"
import classnames from 'classnames'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import './list-mini.scss'

const cn = 'list-mini'

const ListMini = ({list, className, showCreator = true}) => {
  if(!list || !list.creator) return null
  return (
    <section className={classnames(cn, className)}>
      <Link to={`/list/${list.slug}/`} className={`${cn}__image-wrapper`}>
        <Image src={list.image} className={`${cn}__image`} isBordered={false} />
      </Link>
      <div className={`${cn}__primary-attrs`}>
        <Link to={`/list/${list.slug}/`}>
          <Font level="bravo" className={`${cn}__name ${cn}__value`}>{list.name}</Font>
          {showCreator && (
            <Font level="bravo" className={`${cn}__creator`}> by {list.creator.name}</Font>
          )}
        </Link>
      </div>
    </section>
  )
}

export default ListMini
