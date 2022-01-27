import React from 'react'
import cn from 'classnames'
import {Link} from 'gatsby'

import './component.scss'

const baseCn = 'atom-button'
const ELE_TYPE_MAP = {
  button: 'button',
  submit: 'button',
  anchor: 'a',
  link: Link,
}

function Button(props) {
  const {
    className,
    children,
    type = 'button',
    Element = ELE_TYPE_MAP[type],
    primary = false,
    secondary = false,
    hollow = false,
    disabled = false,
    wide = false,
    tight = false,
    minimal = false,
    semitight = false,
    ...restProps
  } = props
  
  const fullClassName =  cn(
    baseCn, 
    className,
    {
      [`${baseCn}--primary`]: primary,
      [`${baseCn}--secondary`]: secondary,
      [`${baseCn}--hollow`]: hollow,
      [`${baseCn}--disabled`]: disabled,
      [`${baseCn}--wide`]: wide,
      [`${baseCn}--tight`]: tight,
      [`${baseCn}--minimal`]: minimal,
      [`${baseCn}--semitight`]: semitight,
    },
  )

  return (
    <Element className={fullClassName} {...restProps}>
      {children}
    </Element>
  );
}

export default Button;