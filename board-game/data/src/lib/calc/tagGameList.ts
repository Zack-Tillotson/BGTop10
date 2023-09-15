import {List, Game} from '../..'

export interface GameMap {
  [key: string]: {
    game: Game,
    count: number,
  },
}

export function calculateTagGameList(lists: List[]) {
  const gameMap: GameMap = {}
  const dateBoundary0 = new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000 // 6 months
  const dateBoundary1 = new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000 // 12 months

  lists.forEach((list) => list.gameLink.forEach((game, index, {length: linkCount}) => {
    gameMap[`${game.bggId}`] = gameMap[`${game.bggId}`] || {game, count: 0}
    
    // Calculates "priority" value for each game using heuristic
    //    listMultiplier is intended to emphasize opinion of newer lists over older ones
    let listMultiplier
    switch(true) {

      // oldest lists
      case(new Date(list.datePublished).getTime() < dateBoundary1): {
        listMultiplier = 2
        break
      }

      // mid-oldest lists
      case(new Date(list.datePublished).getTime() < dateBoundary0): {
        listMultiplier = 3
        break
      }

      // newest lists
      default: 
        listMultiplier = 5
        break
    }
    
    //    placementValue is intended to emphasize higher ratings within a list
    const placementValue = index/linkCount*10 // range 10-1, 10 for the first 10% of items in a list, 1 for the last 10%
    gameMap[game.bggId].count += listMultiplier * placementValue
  }))

  const games = Object.values(gameMap).sort((a, b) => b.count - a.count)

  return games
}