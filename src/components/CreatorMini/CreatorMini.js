import * as React from "react"
import {Link} from 'gatsby'

import Image from 'atoms/Image'

import './creator-mini.scss'

const cn = 'creator-mini'

const CreatorMini = ({creator, wide = false}) => {

  return (
    <section className={`${cn} ${wide && `${cn}--wide`}`}>
      <Link to={`/creator/${creator.slug}/`} className={`${cn}__title`}>
        <h3>{creator.name}</h3>
      </Link>
      <Link to={`/creator/${creator.slug}/`}>
        <Image src={creator.imageAvatar} className={`${cn}__image`} />
      </Link>
    </section>
  )
}

export default CreatorMini
