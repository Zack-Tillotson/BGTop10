import { graphql, useStaticQuery } from "gatsby"

const allGamesQuery = graphql`
  query AllGamesQuery {
    allContentfulGame {
      games: nodes{
        artist
        bggId
        designer
        family
        image
        imageThumbnail
        mechanic
        name
        playerCountMax
        playerCountMin
        publisher
        yearPublished
      }
    }
  }
`

function useListGames(list) {
  const {games} = useStaticQuery(allGamesQuery).allContentfulGame
  
  if(!list) {
    return games
  }

  return list.gameLink.map(({bggId}) => games.find(game => game.bggId === bggId))
}

export default useListGames