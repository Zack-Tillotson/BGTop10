import { Game, Ranking, Tag } from '../../dataTypes'
import { calculateTagGameList } from '../calc/tagGameList'
import {QueryOptions, query, save} from '../firebase/util'

export async function getTag(slug: string): Promise<Tag> {
  const results = await query('tag', {query: ['slug', '==', slug]})
  const tagDoc = results.docs[0]

  const tag = {...tagDoc.data(), id: tagDoc.id} as Tag
  return tag
}

export async function getGamesListForTag(slug: string): Promise<{game: Game, count: number}[]> {
  const tagResult = await query('tag', {query: ['slug', '==', slug]})
  const tagDoc = tagResult.docs[0]
  const tag = {...tagDoc.data(), id: tagDoc.id}

  const listResults = await query('ranking', {query: ['tag', '==', tag.id]})
  const lists = listResults.docs.map(doc => ({...doc.data(), id: doc.id})) as unknown as Ranking[]

  const sortedGameLinks = calculateTagGameList(lists).slice(0, 10).reverse()
  const gameIds = sortedGameLinks.map(link => link.bggId)

  const gameIdsQuery = gameIds.length ? {query: ['bggId', 'in', gameIds]} as QueryOptions: undefined
  const gamesResults = await query('game', gameIdsQuery)

  const gameObjects = gamesResults.docs.map(game => ({...game.data(), id: game.id})) as unknown as Game[]

  const gamesList = sortedGameLinks.map(gameLink => {
    return {
      game: gameObjects.find(game => game.bggId === gameLink.bggId) as Game,
      count: gameLink.count,
    }
  })
  return gamesList
}

export async function takeTag(slug: string, withGames: boolean) {
  const tagPromise = getTag(slug)
  
  let gamesPromise = Promise.resolve<GamesList>([])
  if(withGames) {
    gamesPromise = getGamesListForTag(slug)
  }

  const [tag, gamesList] = await Promise.all([tagPromise, gamesPromise])

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