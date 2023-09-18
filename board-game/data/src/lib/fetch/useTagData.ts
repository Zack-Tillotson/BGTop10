import { List } from 'board-game-data'
import { GamesList, calculateTagGameList } from '../calc/tagGameList'
import {query} from './firebaseUtil'

export interface Tag {
  pageTitle: string,
  pageSubtitle: string,
  introduction: string,
}

async function getTag(slug: string): Promise<Tag> {
  const results = await query('tag', ['slug', '==', slug])
  const tag = results.docs[0].data() as Tag
  return tag
}

async function getGamesListForTag(slug: string): Promise<GamesList> {
  const tagResult = await query('tag', ['slug', '==', slug])
  const tag = tagResult.docs[0].data()
  
  const listResults = await query('list', ['listTags', 'array-contains', tag.id])
  const lists = listResults.docs.map(doc => doc.data()) as any as List[]
  
  const sortedGameLinks = calculateTagGameList(lists).slice(0, 10).reverse()
  
  const gameIds = sortedGameLinks.map(link => link.game.bggId)
  const gamesResults = await query('game', ['bggId', 'in', gameIds])
  
  const gameObjects = gamesResults.docs.map(game => game.data())

  const gamesList = sortedGameLinks.map(gameLink => {
    return {
      game: gameObjects.find(game => game.bggId === gameLink.game.bggId),
      count: gameLink.count,
    }
  }) as GamesList
  return gamesList
}

export async function useTagData(slug: string) {
  const tagPromise = getTag(slug)
  const gamesPromise = getGamesListForTag(slug)

  const [tag, gamesList] = await Promise.all([tagPromise, gamesPromise])

  return {tag, gamesList}
}