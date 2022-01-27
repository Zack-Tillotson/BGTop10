import * as React from 'react'

import './component.scss'
const cn = 'atom-title-row'

export default function TitleRow({Element = 'h2', title= '', children}) {
  return (
    <div className={cn}>
      <Element className={`${cn}__title`}>{title}</Element>
      {children}
    </div>
  )
}