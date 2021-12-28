import React from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-sharp-toggle'

function SharpToggle(props) {
  const {
    className,
    children,
    color = 'red', // red blue green
    active = false,
    onClick,
  } = props

  const isEnabled = !!onClick
  const handleClick = event => isEnabled && onClick(event)

  const fullClassName = cn(baseCn, props.className, `${baseCn}--${color}`, {
    [`${baseCn}--inactive`]: !active, 
    [`${baseCn}--enabled`]: isEnabled, 
  })

  return (
    <div className={fullClassName} onClick={handleClick}>
      <span className={`${baseCn}__inner`}>
        {props.children}
      </span>
    </div>
  )
}

export default SharpToggle;