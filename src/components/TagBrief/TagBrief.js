import * as React from "react"
import classnames from 'classnames'

import Button from 'atoms/Button'
import Font from 'atoms/Font'

import './tag-brief.scss'
import image from 'images/square-logo-57x57.png'

const cn = 'tag-brief'

const TagBrief = ({tag, wide = false, Element = Button, className, ...rest}) => {
  const specialProps = Element === Button ? {wide: true, tight: true} : {}
  return (
    <Element className={classnames(cn, className, {[`${cn}--wide`]: wide})} {...specialProps} {...rest}>
      <div className={`${cn}__icon`} >{tag.icon}</div>
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
