import React, { useState } from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-image'

function Image(props) {
  const {
    className,
    src,
    isBordered = true,
  } = props
  
  const [animationDealy] = useState(Math.random() * 2)

  return (
    <div className={cn(baseCn, className, {[`${baseCn}--bordered`]: isBordered})} style={{[`--animation-delay`]: animationDealy + 's'}}>
      <div className={cn(`${baseCn}__inner`)} style={{backgroundImage: `url("${src}")`}} />
    </div>
  );
}

export default Image;