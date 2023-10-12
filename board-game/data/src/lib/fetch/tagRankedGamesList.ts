'use client'

import { RankedGameIdList } from "../../dataTypes"

async function doFetch(slug: string) { 
  const response = await fetch(`/tag/${slug}/tagRankedGameList`)
  const {result, gameList} = (await response.json())
  if(!result) {
    throw new Error(`tagRankedGamesList, result=${result}`)
  }
  return gameList
}

async function doSave(slug: string, gameIdList: RankedGameIdList) { 
  const response = await fetch(`/tag/${slug}/tagRankedGameList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameIdList)
  })

  return (await response.json()).result as boolean
}

export default {doFetch, doSave}