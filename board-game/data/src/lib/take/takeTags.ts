import { Tag } from '../../dataTypes'
import {query, QueryOptions} from '../firebase/firestore'
import { getGamesForTag } from './takeTag'

async function getTags(options?: QueryOptions): Promise<Tag[]> {
  const results = await query('tag', options)
  const tags = results.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  })) as Tag[]
  return tags
}

export async function takeTags(withGames: boolean, options?: QueryOptions) {
  const tags = await getTags(options)
  const gamesPromises = tags.map(tag => withGames ? getGamesForTag(tag.slug, false) : Promise.resolve([]), [])
  const gamesLists = await Promise.all(gamesPromises)
  
  const tagsWithGames = tags.map((tag, index) => ({
    tag,
    gamesList: gamesLists[index],
  }))

  return tagsWithGames
}