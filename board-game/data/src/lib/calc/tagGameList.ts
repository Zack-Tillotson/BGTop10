import {Ranking} from '../..'

export function calculateTagGameList(lists: Ranking[]) {
  const gameMap: {[key: number|string]: number} = {}
  
  lists.forEach((list) => list.gameLink.forEach(({games}) => {
    games.forEach((bggId, index, {length: linkCount}) => {
      if(gameMap[bggId] === undefined) {
        gameMap[bggId] = 0
      } 
      
      // placementValue is intended to emphasize higher ratings within a list
      const placementValue = (linkCount - index) / linkCount * 10 // range 10-1, ie 10 for the first 10% of items in a list, 1 for the last 10%
      gameMap[bggId] += placementValue
    })
  }))
  const games = Object.keys(gameMap)
    .sort((a, b) => gameMap[b] - gameMap[a])
    .map(key => ({bggId: Number(key), count: gameMap[key]}))

  return games
}