import {useEffect, useState, useDebugValue} from 'react'
import bggNameSearch from 'bggNameSearch'

const STATES = {
  PRE: 'PRE',
  DEBOUNCE: 'DEBOUNCE',
  FETCH: 'FETCH',
  RESULTS: 'RESULTS',
}

const DEBOUNCE_TIME = 1000

const DEFALT_OPTIONS = {
  debounce: true,
  initialQuery: true,
}

function getOptions(rawOptions = {}) {
  return {
    ...DEFALT_OPTIONS,
    ...rawOptions,
  }
}

const cancel = {fn: () => {}}

function useGameSearch(games, query = '', rawOptions) {

  const options = getOptions(rawOptions)

  const [state, updateState] = useState(STATES.PRE)
  const [apiResults, updateApiResult] = useState([])  

  useEffect(() => {

    if(!query) {
      updateState(STATES.PRE)
    }

    if(!query || !options.initialQuery) {
      return
    }

    cancel.fn()

    new Promise((resolve, reject) => {
        updateState(STATES.DEBOUNCE)

        if(options.debounce) {
          setTimeout(resolve, DEBOUNCE_TIME)
        } else {
          resolve(true)
        }
        cancel.fn = reject
      })
      .then(() => {
        const fetch = bggNameSearch.searchNames(query)

        updateState(STATES.FETCH)
        return fetch
      })
      .then(results => {
        if(!results) return
        updateState(STATES.RESULTS)
        updateApiResult(results)
      })
      .catch(e => {
        console.log(e)
      })

  }, [games, query])

  const localList = []
  const bggList = []
  
  apiResults.forEach(apiResult => {
    const game = games.find(game => game.bggId === Number(apiResult.bggId))
    if(game) {
      localList.push(game)
    } else {
      bggList.push(apiResult)
    }
  })

  const closeSearch = () => {
    updateState(STATES.PRE)
  }

  useDebugValue(`${state}, localList: ${localList.length}, bggList: ${bggList.length}`)

  return {
    STATES,
    state,
    total: apiResults.length,
    apiResults,
    localList,
    bggList,
    closeSearch,
  }
}

export default useGameSearch