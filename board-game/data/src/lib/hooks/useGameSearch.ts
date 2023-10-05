'use client'

import { ChangeEvent, SyntheticEvent, useState, useEffect, useDebugValue } from "react";
import bggNameSearch from '../calc/bggNameSearch'

interface BggGame {
  name: string,
  yearPublished: string,
  bggId: number,
}

const STATES = {
  PRE: 'PRE',
  DEBOUNCE: 'DEBOUNCE',
  FETCH: 'FETCH',
  RESULTS: 'RESULTS',
}

const DEBOUNCE_TIME = 1000

// eslint-disable-next-line @typescript-eslint/no-empty-function
const cancel = {fn: () => {}}

export function useGameSearch() {
  
  const [queryState, updateQueryState] = useState(STATES.PRE)
  const [queryTerm, updateQueryTerm] = useState('')
  const [gamesList, updateGamesList] = useState<BggGame[]>([])

  useEffect(() => {
    if(!queryTerm) {
      updateQueryState(STATES.PRE)
    }

    cancel.fn()

    new Promise((resolve, reject) => {
        updateQueryState(STATES.DEBOUNCE)

        setTimeout(resolve, DEBOUNCE_TIME)
        cancel.fn = reject
      })
      .then(() => {
        updateQueryState(STATES.FETCH)
        return bggNameSearch(queryTerm)
      })
      .then(results => {
        if(!results) return
        updateQueryState(STATES.RESULTS)
        updateGamesList(results)
      })
      .catch(e => {
        console.log(e)
      })

  }, [queryTerm])

  const handleChange = (event: SyntheticEvent<HTMLInputElement, ChangeEvent>) => {
    const value = event.currentTarget.value
    updateQueryTerm(value)
  }

  useDebugValue(`${queryTerm}=>${queryState}, ${gamesList.length} games`)

  return {
    queryState,
    queryTerm,
    isLoading: queryState === STATES.FETCH,
    gamesList,
    handleChange,  
  }
}
