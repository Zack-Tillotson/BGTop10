import React, {useState, useRef, useEffect} from "react"
import {Link, navigate} from 'gatsby'

import GameMini from 'components/GameMini'
import GameBrief from 'components/GameBrief'
import useGameSearch from './useGameSearch'

import './search.scss'

const baseCn = 'search-view'
const maskClassName = `${baseCn}__input-results-mask`

const SearchView = ({games, query}) => {

  // Page results
  const querySearch = useGameSearch(games, query, {debounce: false})

  // Input "in-line" results
  const [inputValue, updateInputValue] = useState(query)
  const inputSearch = useGameSearch(games, inputValue, {initialQuery: inputValue !== query})
  const inputEle = useRef(null)

  useEffect(() => {
    if(inputEle.current) {
      inputEle.current.focus()
    }
  }, [inputEle.current])

  const handleInputChange = event => {
    updateInputValue(event.target.value)
  }

  const handleClearClick = event => {
    event.preventDefault()
    updateInputValue('')
    inputSearch.closeSearch()
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    navigate(`?q=${inputValue}`)
    inputSearch.closeSearch()
  }

  const handleMaskClick = event => {
    if(event.target.className.includes(maskClassName)) {
      inputSearch.closeSearch()
    }
  }

  return (
    <div>
      <h1>Find a game</h1>
      <section>
        {inputSearch.state !== inputSearch.STATES.PRE && (
          <div className={maskClassName} onClick={handleMaskClick} />
        )}
        <form onSubmit={handleFormSubmit}>
          <div className={`${baseCn}__input-wrapper`}>
            <input 
              className={`${baseCn}__input`} 
              type="text" 
              aria-label="Search" 
              placeholder="Enter the name of a game, eg 'Dominion'" 
              value={inputValue} 
              onChange={handleInputChange}
              ref={inputEle}
              />
            <button type="button" onClick={handleClearClick} className={`${baseCn}__input-clear`}>✕</button>
            {inputSearch.state !== inputSearch.STATES.PRE && (
              <div className={`${baseCn}__input-results`}>
                <ul>
                  {inputSearch.localList.slice(0, 5).map(gameStub => (
                    <li key={gameStub.bggId}>
                      <Link to={`/game/${gameStub.bggId}/`}>
                        <GameBrief game={gameStub} />
                      </Link>
                    </li>
                  ))}
                  {inputSearch.bggList.slice(0, Math.max(0, 5 - inputSearch.localList.length)).map(gameStub => (
                    <li key={gameStub.bggId}>
                      <a href={`https://boardgamegeek.com/boardgame/${gameStub.bggId}/`} target="_blank">
                        <GameBrief game={gameStub} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </section>
      {querySearch.state === querySearch.STATES.RESULTS && (
        <section>
          {querySearch.total === 0 && (
            <h2>No results</h2>
          )}
          {querySearch.localList.length > 0 && (
            <>
              <h2>Top Results</h2>
              <ul>
                {querySearch.localList.map(game => (
                  <li key={game.bggId}>
                    <GameMini game={game} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {querySearch.localList.length > 0 && (
            <>
              <h2>More possible results</h2>
              <ul>
                {querySearch.bggList.map(gameStub => (
                  <li key={gameStub.bggId}>
                    <a href={`https://boardgamegeek.com/boardgame/${gameStub.bggId}/`} target="_blank">
                      <GameBrief game={gameStub} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </div>
  )
}

export default SearchView
