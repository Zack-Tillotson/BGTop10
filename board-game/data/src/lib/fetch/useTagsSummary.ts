import { List, getGamesListForTag } from 'board-game-data'
import { GamesList, calculateTagGameList } from '../calc/tagGameList'
import { getTags } from './queryUtil'


export async function useTagsSummary() {
  const tags = await getTags()
  const gamesPromises = [tags[0]].map(tag => getGamesListForTag(tag.slug), [])
  const gamesLists = await Promise.all(gamesPromises)
  
  const tagsWithGames = tags.map((tag, index) => ({
    tag, 
    gamesList: gamesLists[index],
  }))

  return tagsWithGames
}