import React from 'react';
import cn from 'classnames'

import Button from 'atoms/Button'
import CreatorBrief from 'components/CreatorBrief'

import useCreatorSelector from './useCreatorSelector'

import './creator-selector-pane.scss'

const baseCn = 'creator-selector-pane'

function CreatorSelectorPane(props) {
  const {
    onSelect = () => {},
    onClose,
  } = props

  const {list} = useCreatorSelector()

  const handleCreatorClick = creator => () => {
    onSelect(creator)
    onClose()
  }
  
  return (
    <div className={cn(baseCn)} role="document">
      <h1>
        Select a creator
      </h1>
      <section>
        <ul>
          {list.map(creator => (
            <li key={creator.slug} className={`${baseCn}__creator`}>
              <Button onClick={handleCreatorClick(creator)} minimal>
                <CreatorBrief creator={creator} />
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )

}

export default CreatorSelectorPane;