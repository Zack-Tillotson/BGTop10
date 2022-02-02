import * as React from 'react'

import './component.scss'
const cn = 'atom-title-row'

export default function TitleRow({Element = 'h2', title= '', className = '', children}) {
  return (
    <div className={`${cn} ${className}`}>
      <Element className={`${cn}__title`}>{title}</Element>
      {children}
    </div>
  )
}