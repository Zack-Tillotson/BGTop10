import React from 'react'
import cn from 'classnames'

import './component.scss'

const baseCn = 'atom-font'

function Font({level, className, children, Ele = 'div', ...rest}) {
  return (
    <Ele className={cn(baseCn, className, `${baseCn}--${level}`)} {...rest}>
      {children}
    </Ele>
  );
}

export default Font;