import * as React from "react"

import GameMini from 'components/GameMini'
import ListsBox from 'components/ListsBox'
import CreatorPills from 'components/CreatorPills'

const IndexPage = ({creators, lists, games}) => {

  return (
    <>
      <section>
        <h4>Popular creators</h4>
        <CreatorPills creators={creators} />
      </section>
      <section>
        <h2>Check out these game lists</h2>
        <ListsBox lists={lists} />
      </section>
      <section>
        <h2>Hot games</h2>
        <ul>
          {games.slice(0, 10).map(game => (
            <li key={game.bggId}>
              <GameMini game={game} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default IndexPage
