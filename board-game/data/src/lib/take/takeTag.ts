import { Game, Ranking, Tag } from '../../dataTypes'
import { calculateTagGameList } from '../calc/tagGameList'
import {QueryOptions, query, save, get} from '../firebase/util'

type RankedGameIdList = {bggId: number, count: number}[]
type RankedGameList = {game: Game, count: number}[]

export async function getTag(slug: string): Promise<Tag> {
  const results = await query('tag', {query: ['slug', '==', slug]})
  const tagDoc = results.docs[0]

  const tag = {...tagDoc.data(), id: tagDoc.id} as Tag
  return tag
}

export async function buildGamesForTag(slug: string) {
  const tagResult = await query('tag', {query: ['slug', '==', slug]})
  if(tagResult.docs.length !== 1) {
    throw new Error(`Invalid tag found for slug=="${slug}"`)
  }
  const tagId = tagResult.docs[0].id

  const listResults = await query('ranking', {query: ['tag', '==', tagId]})

  if(listResults.docs.length === 0) {
    throw new Error(`Invalid rankings found for tag=="${tagId}"`)
  }
  const lists = listResults.docs.map(doc => ({...doc.data(), id: doc.id})) as unknown as Ranking[]

  console.log('buildGamesForTag', lists.length)
  const rankedGameIds = calculateTagGameList(lists).slice(0, 25).reverse()
  return rankedGameIds
}

export async function saveGamesForTag(slug: string, rankedGameIds: RankedGameIdList) {

  try {
    await save('tagGameIdList', {rankedGameIds}, slug)
  } catch(e) {
    console.log(e)
    return false
  }

  return true
}

export async function getGamesForTag(slug: string): Promise<RankedGameList> {
  const rankedGameIdResult = await get('tagGameIdList', slug)
  if(!rankedGameIdResult.exists) return []

  const rankedGameIds = rankedGameIdResult.data()?.rankedGameIds.slice(-10) as RankedGameIdList
  const gameList = getGameListFromIds(rankedGameIds)
  return gameList
}

export async function getGameListFromIds(gameIdList: RankedGameIdList) {
  const gameIds = gameIdList.map(({bggId}) => bggId)

  const gameIdsQuery = gameIds.length ? {query: ['bggId', 'in', gameIds]} as QueryOptions: undefined
  const gamesResults = await query('game', gameIdsQuery)

  const gameList = gamesResults.docs.map(doc => ({
    ...doc.data(),
    id: doc.id, 
  })) as Game[]

  const rankedGameList = gameIdList.map(({count, bggId}) => ({
    count,
    game: gameList.find(game => game.bggId === bggId),
  })) as RankedGameList

  return rankedGameList
}

export async function takeTag(slug: string, withGames: boolean) {
  if(!slug) return {tag: undefined, gamesList: []}

  const tag = await getTag(slug)
  
  let gamesList = [] as RankedGameList
  if(withGames) {
    gamesList = await getGamesForTag(slug)
  }

  return {tag, gamesList}
}


export async function saveTag(tag: Tag) {
  try {
    const {id, ...doc} = tag
    await save('tag', doc, id)
  } catch(e) {
    return false
  }

  return true
}