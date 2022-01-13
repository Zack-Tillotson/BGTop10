import * as React from "react"
import classnames from 'classnames'
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import CreatorBrief from "components/CreatorBrief"

import './list-mini.scss'

const cn = 'list-mini'

const ListMini = ({list, className, to = `/list/${list.slug}/`, showCreator = true, creatorTo = `/creator/${list.creator.slug}/`}) => {
  
  return (
    <section className={classnames(cn, className)}>
      <Link to={to} className={`${cn}__image-wrapper`}>
        <img src={list.image} className={`${cn}__image`} />
      </Link>
      <div className={`${cn}__secondary-attrs`}>
        <Font level="delta">Published: {new Date(list.datePublished).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</Font>
      </div>
      <div className={`${cn}__primary-attrs`}>
        <Link to={to}>
          <Font level="charlie" className={`${cn}__name ${cn}__value`}>{list.name}</Font>
        {showCreator && (
          <CreatorBrief className={`${cn}__creator`} creator={list.creator} to={creatorTo} Element={Link} />
        )}
        </Link>
      </div>
    </section>
  )
}

export default ListMini
