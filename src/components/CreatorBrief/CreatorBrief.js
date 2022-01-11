import * as React from "react"

import Button from 'atoms/Button'
import Image from 'atoms/Image'

import './creator-brief.scss'

const cn = 'creator-brief'

const CreatorBrief = ({creator, wide = false, isLink = true, ...rest}) => {
  const Element = isLink ? Button : 'div'
  const specialProps = isLink ? {wide: true, tight: true, type: 'link'} : {}
  return (
    <Element className={`${cn} ${wide && `${cn}--wide`}`} {...specialProps} {...rest}>
      <Image src={creator.imageAvatar} className={`${cn}__image`} isBordered={false} />
      <div className={`${cn}__title`}>{creator.name}</div>
    </Element>
  )
}

export default CreatorBrief
