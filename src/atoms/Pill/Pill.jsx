import React from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-pill'

function Pill(props) {
  const {
    className,
    children,
    Element = 'div',
    ...restProps
  } = props

  const fullClassName = cn(baseCn, props.className)

  return (
    <Element className={fullClassName} {...restProps}>
      <span className={`${baseCn}__inner`}>
        {children}
      </span>
    </Element>
  )
}

export default Pill