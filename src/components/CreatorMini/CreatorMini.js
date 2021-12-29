import * as React from "react"

import Image from 'atoms/Image'

import './creator-mini.scss'

const cn = 'creator-mini'

const CreatorMini = ({creator}) => {

  return (
    <section className={cn}>
      <h3 className={`${cn}__title`}>{creator.name}</h3>
      <Image src={creator.imageAvatar} className={`${cn}__image`} />
    </section>
  )
}

export default CreatorMini
