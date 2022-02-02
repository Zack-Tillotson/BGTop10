import * as React from "react"

import Button from 'atoms/Button'
import Font from 'atoms/Font'

import './tag-brief.scss'

const cn = 'tag-brief'

const TagBrief = ({tag, wide = false, Element = Button, ...rest}) => {
  const specialProps = Element === Button ? {wide: true, tight: true} : {}
  return (
    <Element className={`${cn} ${wide ? `${cn}--wide` : ''}`} {...specialProps} {...rest}>
      <div className={`${cn}__title`}>{tag.display}</div>
      {tag.pageSubtitle && (
        <div className={`${cn}__subtitle`}>
          {tag.pageSubtitle.pageSubtitle}
        </div>
      )}
    </Element>
  )
}

export default TagBrief
