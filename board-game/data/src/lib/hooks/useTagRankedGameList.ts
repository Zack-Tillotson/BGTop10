'use client'

import { useCallback, useState } from "react"
import tagUtils from '../fetch/tagRankedGamesList'
import { RankedGameList } from "../../dataTypes"

const {doFetch, doSave} = tagUtils

enum HOOK_STATE {
  CLEAN = 'CLEAN',
  GENERATING_IN_PROGRESS = 'GENERATING_IN_PROGRESS',
  GENERATING_ERROR = 'GENERATING_ERROR',
  IN_REVIEW = 'IN_REVIEW',
  SAVING_IN_PROGRESS = 'SAVING_IN_PROGRESS',
  SAVING_ERROR = 'SAVING_ERROR',
  SAVING_SUCCESS = 'SAVING_SUCCESS',
}

export function useTagRankedGameList(slug: string) {

  const [gameList, updateGameList] = useState<RankedGameList>([]) 
  const [state, updateState] = useState(HOOK_STATE.CLEAN)
  
  const handleGenerateList = useCallback(async () => {
      updateState(HOOK_STATE.GENERATING_IN_PROGRESS)
      try {
        const newGameList = await doFetch(slug)
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
      const gameIdList = gameList.map(({count, game: {bggId}}) => ({count, bggId}))
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
  
  return {
    state,
    gameList,
    handleGenerateList,
    handleSaveList,
  }
}