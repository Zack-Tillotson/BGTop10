import * as React from "react"

import Button from 'atoms/Button'
import Image from 'atoms/Image'

import './creator-brief.scss'

const cn = 'creator-brief'

const CreatorBrief = ({creator, wide = false, ...rest}) => {

  return (
    <Button className={`${cn} ${wide && `${cn}--wide`}`} wide tight {...rest}>
      <Image src={creator.imageAvatar} className={`${cn}__image`} isBordered={false} />
      <div className={`${cn}__title`}>{creator.name}</div>
    </Button>
  )
}

export default CreatorBrief
