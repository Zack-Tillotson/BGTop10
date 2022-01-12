import * as React from "react"
import classnames from 'classnames'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import './list-mini.scss'

const cn = 'list-mini'

const ListMini = ({list, className, to = `/list/${list.slug}/`, showCreator = true, creatorTo = `/creator/${list.creator.slug}/`}) => {
  
  return (
    <section className={classnames(cn, className)}>
      <Link to={to} className={`${cn}__image-wrapper`}>
        <img src={list.image} className={`${cn}__image`} />
      </Link>
      <div className={`${cn}__primary-attrs`}>
        <Link to={to}>
          <Font level="bravo" className={`${cn}__name ${cn}__value`}>{list.name}</Font>
        </Link>
        {showCreator && (
          <Link to={creatorTo}>
            <Font level="bravo" className={`${cn}__creator`}>{list.creator.name}</Font>
          </Link>
        )}
      </div>
    </section>
  )
}

export default ListMini
