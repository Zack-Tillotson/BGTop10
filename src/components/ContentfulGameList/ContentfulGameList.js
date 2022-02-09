import * as React from "react"

import Font from 'atoms/Font'
import GameBrief from 'components/GameBrief'

import useGame from 'contentful/useGame'

import './contentful-game-list.scss'

const baseCn = 'contentful-game-list'

const ContentfulCreatorList = () => {
  const {cmsList} = useGame(true)

  return (
    <section className={baseCn}>
      <h3>Games</h3>
      <Font level="delta">
        <strong>Count:</strong> {cmsList.length}
      </Font>
      {cmsList.map(game => (
        <GameBrief key={game.bggId} game={game} type="link" to={`/admin/game/${game.bggId}/`} />
      ))}
    </section>
  )
}

export default ContentfulCreatorList
