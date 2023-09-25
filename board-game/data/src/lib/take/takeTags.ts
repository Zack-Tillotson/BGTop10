import { getGamesListForTag, Tag } from 'board-game-data'
import {query, QueryOptions} from '../firebase/util'


async function getTags(options?: QueryOptions): Promise<Tag[]> {
  const results = await query('tag', options)
  const tags = results.docs.map(doc => doc.data()) as Tag[]
  return tags
}

export async function takeTags(options?: QueryOptions) {
  const tags = await getTags(options)
  const gamesPromises = tags.slice(0, 1).map(tag => getGamesListForTag(tag.slug), [])
  const gamesLists = await Promise.all(gamesPromises)
  
  const tagsWithGames = tags.map((tag, index) => ({
    tag, 
    gamesList: gamesLists[index],
  }))

  return tagsWithGames
}