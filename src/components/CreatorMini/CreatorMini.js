import * as React from "react"
import {Link} from 'gatsby'

import Image from 'atoms/Image'

import './creator-mini.scss'

const cn = 'creator-mini'

const CreatorMini = ({creator, wide = false, Element = 'div'}) => {
  return (
    <section className={`${cn} ${wide && `${cn}--wide`}`}>
      <Element to={`/creator/${creator.slug}/`} className={`${cn}__title`}>
        <h3>{creator.name}</h3>
      </Element>
      <Element to={`/creator/${creator.slug}/`}>
        <Image src={creator.imageAvatar} className={`${cn}__image`} />
      </Element>
    </section>
  )
}

export default CreatorMini
