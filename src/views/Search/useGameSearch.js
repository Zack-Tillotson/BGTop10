function useGameSearch(games, query = '') {
  const foundList = games.filter(game => game.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
  const bggList = []
  
  const total = foundList.length + bggList.length

  return {foundList, bggList, total}
}

export default useGameSearch