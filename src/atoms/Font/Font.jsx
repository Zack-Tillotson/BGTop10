import React from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-font'

function Font({level, className, children, ...rest}) {
  return (
    <div className={cn(baseCn, className, `${baseCn}--${level}`)} {...rest}>
      {children}
    </div>
  );
}

export default Font;