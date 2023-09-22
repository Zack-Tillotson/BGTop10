import { Game, List, Tag } from 'board-game-data'
import { GamesList, calculateTagGameList } from '../calc/tagGameList'
import {query} from '../firebase/util'

export async function getTag(slug: string): Promise<Tag> {
  const results = await query('tag', {query: ['slug', '==', slug]})
  const tag = results.docs[0].data() as Tag
  return tag
}

export async function getGamesListForTag(slug: string): Promise<GamesList> {
  const tagResult = await query('tag', {query: ['slug', '==', slug]})
  const tagDoc = tagResult.docs[0]
  const tag = {...tagDoc.data(), id: tagDoc.id}
  
  const listResults = await query('list', {query: ['listTags', 'array-contains', tag.id]})
  const lists = listResults.docs.map(doc => ({...doc.data(), id: doc.id})) as unknown as List[]
  
  const sortedGameLinks = calculateTagGameList(lists).slice(0, 10).reverse()
  
  const gameIds = sortedGameLinks.map(link => link.game.bggId)
  const gamesResults = await query('game', {query: ['bggId', 'in', gameIds]})
  
  const gameObjects = gamesResults.docs.map(game => ({...game.data(), id: game.id})) as unknown as Game[]

  const gamesList = sortedGameLinks.map(gameLink => {
    return {
      game: gameObjects.find(game => game.bggId === gameLink.game.bggId) as Game,
      count: gameLink.count,
    }
  })
  return gamesList
}

export async function takeTag(slug: string) {
  const tagPromise = getTag(slug)
  const gamesPromise = getGamesListForTag(slug)

  const [tag, gamesList] = await Promise.all([tagPromise, gamesPromise])

  return {tag, gamesList}
}