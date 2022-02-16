import React, {useState} from "react"
import {Link, navigate} from 'gatsby'

import GameMini from 'components/GameMini'
import useGameSearch from './useGameSearch'

import './search.scss'

const baseCn = 'search-view'

const SearchView = ({games, query}) => {

  const [inputValue, updateInputValue] = useState(query)
  const searchGames = useGameSearch(games, query)

  const handleInputChange = event => {
    updateInputValue(event.target.value)
  }

  const handleClearClick = event => {
    event.preventDefault()
    updateInputValue('')
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    navigate(`?q=${inputValue}`)
  }

  return (
    <div>
      <h1>Find a game</h1>
      <section>
        <form onSubmit={handleFormSubmit}>
          <div className={`${baseCn}__input-wrapper`}>
            <input className={`${baseCn}__input`} type="text" aria-label="Search" placeholder="Search for a game" value={inputValue} onChange={handleInputChange} />
            <button type="button" onClick={handleClearClick} className={`${baseCn}__input-clear`}>✕</button>
          </div>
        </form>
      </section>
      {!!query && (
        <section>
          <h2>Results</h2>
          {searchGames.total === 0 && (
            'No results'
          )}
          {searchGames.total > 0 && (
            <ul>
              {searchGames.foundList.map(game => (
                <li key={game.bggId}>
                    <GameMini game={game} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}

export default SearchView
