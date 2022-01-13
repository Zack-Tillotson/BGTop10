import * as React from "react"
import {Link} from 'gatsby'

import './creator-brief.scss'

const cn = 'creator-brief'

const CreatorBrief = ({creator, wide = false, className, Element = 'div', ...rest}) => {

  return (
    <Element className={`${className} ${cn} ${wide && `${cn}--wide`}`} {...rest}>
      <img alt={`${creator.name} logo`} src={creator.imageAvatar} className={`${cn}__image`} />
      <div className={`${cn}__title`}>{creator.name}</div>
    </Element>
  )
}

export default CreatorBrief
