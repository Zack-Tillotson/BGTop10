import React from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-image'

function Image(props) {
  const {
    className,
    src,
    isBordered = true,
  } = props

  return (
    <div className={cn(baseCn, className, {[`${baseCn}--bordered`]: isBordered})}>
      <div className={cn(`${baseCn}__inner`)} style={{backgroundImage: `url("${src}")`}} />
    </div>
  );
}

export default Image;