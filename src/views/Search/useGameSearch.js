import {useEffect, useState, useDebugValue} from 'react'
import bggNameSearch from 'bggNameSearch'

const STATES = {
  PRE: 'PRE',
  DEBOUNCE: 'DEBOUNCE',
  FETCH: 'FETCH',
  RESULTS: 'RESULTS',
}

const DEBOUNCE_TIME = 2000

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

function useGameSearch(games, query = '', rawOptions) {

  const options = getOptions(rawOptions)

  const [state, updateState] = useState(STATES.PRE)
  const [apiResults, updateApiResult] = useState([])  
  const [cancel, updateCancel] = useState({fn: null})

  // Called once whenever query changes
  useEffect(() => {

    if(!query) {
      updateState(STATES.PRE)
    }

    if(cancel.fn) {
      cancel.fn()
      updateCancel({fn: null})
    }

    if(!query || !options.initialQuery) {
      return
    }

    new Promise((resolve, reject) => {
      updateState(STATES.DEBOUNCE)
      updateCancel({fn: reject})

      if(options.debounce) {
        setTimeout(resolve, DEBOUNCE_TIME)
      } else {
        resolve(true)
      }
    })
    .then(() => {
      const fetch = bggNameSearch.searchNames(query)

      updateState(STATES.FETCH)
      updateCancel({fn: fetch.cancel})
      
      return fetch
    })
    .then(results => {
      updateState(STATES.RESULTS)
      updateCancel({fn: null})
      updateApiResult(results)
    })
    .catch(e => {
      updateCancel({fn: null})
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

  useDebugValue(`${state}, localList: ${localList.length}, bggList: ${bggList.length}`)

  return {
    STATES,
    state,
    total: apiResults.length,
    apiResults,
    localList,
    bggList,
  }
}

export default useGameSearch