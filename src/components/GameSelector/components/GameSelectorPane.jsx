import React, {useState} from 'react';
import cn from 'classnames'

import Font from 'atoms/Font'
import GameBrief from 'components/GameBrief'

import useGameSelector from './useGameSelector'

import './game-selector-pane.scss'

const baseCn = 'game-selector-pane'

const filterInputId = 'game-selector-input'

function GameSelectorPane(props) {
  const {
    defaultInput = '',
    onSelect = () => {},
    onClose,
  } = props

  const state = useGameSelector(defaultInput)

  const handleItemClick = item => event => {
    event.preventDefault()
    onSelect(item)
    onClose()
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    state.onStartBggSearch(state.inputValue)
  }

  const handleInputChange = event => {
    state.onInputChange(event.target.value)
  }

  return (
    <div className={cn(baseCn)} role="document" tabIndex="0">
      <form onSubmit={handleFormSubmit}>
        <h1>
          Select a game
        </h1>
        <section>
          <input 
            type="text" 
            id={filterInputId} 
            value={state.inputValue} 
            autoFocus
            onChange={handleInputChange}
            placeholder={`Add '+' for expansions,  "" for exact`} />
        </section>
        <section>
          {state.results.length === 0 && (
            <div>No items found</div>
          )}
          {state.results.length > 0 && (
            <>
              <Font level="delta" className={`${baseCn}__search-hint`}>
                Search term: {state.searchTerm}
              </Font>
              <ul>
                {state.results.map(result => (
                  <GameBrief key={result.bggId} game={result} onClick={handleItemClick(result)} />
                ))}
              </ul>
            </>
          )}
        </section>
      </form>
    </div>
  )

}

export default GameSelectorPane