import {useState} from 'react'

import bggSearch from './bggNameSearch'

const SEARCH_STATES = {
  NOT_SEARCHED: 'NOT_SEARCHED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
}

function useGameSelector() {
  
  const [results, updateResults] = useState([])
  const [inputValue, updateInputValue] = useState('')
  const [searchTerm, updateSearchTerm] = useState('')
  const [searchState, updateSearchState] = useState(SEARCH_STATES.NOT_SEARCHED)
  
  const onInputChange = value => updateInputValue(value)
  
  const onStartBggSearch = () => {
    updateResults([])
    updateSearchTerm(inputValue)
    updateSearchState(SEARCH_STATES.IN_PROGRESS)

    bggSearch.searchNames(inputValue).then(results => {
      updateResults(results)
      updateSearchState(SEARCH_STATES.COMPLETE)
    })
  }
  
  return {
    results,
    inputValue,
    searchTerm,
    searchState,

    SEARCH_STATES,

    onInputChange,
    onStartBggSearch,
  }
}

export default useGameSelector