import useListGames from 'useListGames'

function useTagData(tag, lists) {
  
  const allGames = useListGames()

  if(!tag) {
    return {}
  }

  const gameMap = {}
  lists.forEach(list => list.gameLink.forEach((game, index, {length: linkCount}) => {
    gameMap[game.bggId] = gameMap[game.bggId] || {game, count: 0}
    gameMap[game.bggId].count += (linkCount - index)/linkCount*10 // 10-1 pt, 10 for a top 10% 1 for a 90% of list
  }))
  const games = Object.values(gameMap)
  .sort((a, b) => b.count - a.count)
  .map(link => ({...allGames.find(game => game.bggId === link.game.bggId), count: link.count}))
  
  const creatorMap = {}
  lists.forEach(({creator}) => {
    creatorMap[creator.slug] = creatorMap[creator.slug] || {creator, count: 0}
    creatorMap[creator.slug].count++
  })
  const creators = Object.values(creatorMap).sort((a, b) => b.count - a.count).map(item => item.creator)

  return {creators, games}
}

export default useTagData