import { getGamesListForTag, Tag } from 'board-game-data'
import {query} from '../firebase/util'


async function getTags(): Promise<Tag[]> {
  const results = await query('tag')
  const tags = results.docs.map(doc => doc.data()) as Tag[]
  return tags
}

export async function takeTags() {
  const tags = await getTags()
  const gamesPromises = tags.slice(0, 1).map(tag => getGamesListForTag(tag.slug), [])
  const gamesLists = await Promise.all(gamesPromises)
  
  const tagsWithGames = tags.map((tag, index) => ({
    tag, 
    gamesList: gamesLists[index],
  }))

  return tagsWithGames
}