'use client'

import { useCallback, useState } from "react"
import tagUtils from '../fetch/tagRankedGamesList'
import { RankedGameList } from "../../dataTypes"
import bggGameAttrs from "../calc/bggGameAttrs"
import { buildGame, buildGameForm } from "./useGameForm"
import { submitForm } from "../fetch/submitForm"

const {doFetch, doSave} = tagUtils

export enum HOOK_STATE {
  CLEAN = 'CLEAN',
  GENERATING_IN_PROGRESS = 'GENERATING_IN_PROGRESS',
  GENERATING_ERROR = 'GENERATING_ERROR',
  IN_REVIEW = 'IN_REVIEW',
  SAVING_IN_PROGRESS = 'SAVING_IN_PROGRESS',
  SAVING_ERROR = 'SAVING_ERROR',
  SAVING_SUCCESS = 'SAVING_SUCCESS',

  UPDATE_GAMES_IN_PROGRESS = 'UPDATE_GAMES_IN_PROGRESS',
}

const pause = (duration: number) => new Promise(resolve => {
  setTimeout(resolve, duration)
})

export function useTagRankedGameList(slug: string) {

  const [gameList, updateGameList] = useState<RankedGameList>([]) 
  const [state, updateState] = useState(HOOK_STATE.CLEAN)
  
  const handleGenerateList = useCallback(async () => {
      updateState(HOOK_STATE.GENERATING_IN_PROGRESS)
      try {
        const newGameList = await doFetch(slug) // new game list built on server route
        updateGameList(newGameList)
        updateState(HOOK_STATE.IN_REVIEW)
      } catch(e) {
        updateState(HOOK_STATE.GENERATING_ERROR)
        console.log('useTagRankedGameList', e)
      }
  }, [slug])
  
  const handleSaveList = useCallback(async () => {
    updateState(HOOK_STATE.SAVING_IN_PROGRESS)
    try {
      const gameIdList = gameList.map(({count, bggId = -1}) => ({count, bggId}))
      
      if(gameIdList.find(({bggId}) => bggId === -1)) {
        console.log('Error, game list invalid', gameList)
        throw new Error(`Game list missing BGG Id`)
      }

      const result = await doSave(slug, gameIdList)
      
      if(result) {
        updateState(HOOK_STATE.SAVING_SUCCESS)
      } else {
        updateState(HOOK_STATE.SAVING_ERROR)
      }
    } catch(e) {
      updateState(HOOK_STATE.SAVING_ERROR)
      console.log('useTagRankedGameList', e)
    }
  }, [slug, gameList])

  const handleUpdateAllGames = useCallback(async () => {
    const priorState = state
    updateState(HOOK_STATE.UPDATE_GAMES_IN_PROGRESS)

    for(let gameIndex = 0 ; gameIndex < gameList.length; gameIndex++) {


      const bggId = gameList[gameIndex]?.bggId
      const gameId = String(gameList[gameIndex]?.game?.id || bggId || `${Math.random()}`.slice(2, 10))

      if(!bggId) {
        throw new Error('BGG Id invalid. Enter BGG Id into URL or form field.')
      }
      const item = await bggGameAttrs(bggId)
      const gameForm = buildGameForm(item)
      const formGame = buildGame(gameForm, gameId)
      const result = await submitForm('game', formGame)

      console.log('handleUpdateAllGames', bggId, result, formGame)

      await pause(1250)
    }

    updateState(priorState)

  }, [gameList, state])
  
  return {
    state,
    gameList,
    handleGenerateList,
    handleSaveList,
    handleUpdateAllGames,
  }
}