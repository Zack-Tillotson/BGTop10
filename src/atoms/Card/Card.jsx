import React from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-card'

function Card(props) {
  const {
    className,
    children,
    style,
  } = props
  

  return (
    <div className={cn(baseCn, className)} style={style}>
      {children}
    </div>
  );
}

export default Card;