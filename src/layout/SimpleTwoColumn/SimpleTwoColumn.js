// Layout component which presents the content in two column when widescreen or
// one column when not. Content is interleaved left one, right, left two when in 
// single column mode.
import * as React from "react"
import cn from 'classnames'

import './component.scss'

const baseCn = 'layout-simple-two-column'

const DefaultSectionWrapper = ({sectionName, className, content}) => (
  <section className={cn(`${baseCn}__${sectionName}`, className)}>
    {content}
  </section>
)

const sections = [
  'leftTop',
  'right',
  'leftBot',
]

const ListView = (props) => {
  const {
    className, 
    SectionWrapper = DefaultSectionWrapper,
    content,
    classNames = {},
    children,
  } = props

  return (
    <div className={cn(baseCn, className)}>
      {sections.map(sectionName => (
        <SectionWrapper 
          key={sectionName} 
          sectionName={sectionName}
          className={classNames[sectionName]}
          content={content[sectionName]} 
          />
      ))}
      <SectionWrapper sectionName="children" content={children} />
    </div>
  )
}

export default ListView
