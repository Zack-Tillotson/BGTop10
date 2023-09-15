import { List } from 'board-game-data'
import { calculateTagGameList } from '../calc/tagGameList'
import {query} from './firebaseUtil'

async function getTag(slug: string) {
  const results = await query('tag', ['slug', '==', slug])
  const tag = results.docs[0].data()
  return tag
}

async function getGamesForTag(slug: string) {
  const tagResult = await query('tag', ['slug', '==', slug])
  const tag = tagResult.docs[0].data()
  
  const listResults = await query('list', ['listTags', 'array-contains', tag.id])
  const lists = listResults.docs.map(doc => doc.data()) as any as List[]
  
  const sortedGameLinks = calculateTagGameList(lists)
  const gameIds = sortedGameLinks.slice(0, 10).map(link => link.game.bggId)
  
  const gamesResults = await query('game', ['bggId', 'in', gameIds])
  const games = gamesResults.docs.map(game => game.data())
  
  return games
}

export async function useTagData(slug: string) {
  const tagPromise = getTag(slug)
  const gamesPromise = getGamesForTag(slug)

  const [tag, games] = await Promise.all([tagPromise, gamesPromise])

  return {tag, games}
}