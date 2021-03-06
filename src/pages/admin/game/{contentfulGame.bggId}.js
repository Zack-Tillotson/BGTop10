import React from "react"
import { graphql } from 'gatsby'

import Page from 'layout/Page'
import Game from "views/Game"
import GameBrief from "components/GameBrief"
import Button from "atoms/Button"
import Breadcrumbs from "layout/Breadcrumbs"

import useGame from 'contentful/useGame'

const baseCn = 'admin'

const AdminCreatorEditPage = ({location, data}) => {
  const contentfulGames = useGame()

  const crumbs = [
    {display: 'Home', url: '/'}, 
    {display: 'Admin', url: '/admin/'}, 
    {display: 'Games', url: '/admin/game/'},
    {display: data.game.name, url: `/admin/game/${data.games.bggId}/`},
  ]

  const handleRefreshClick = () => {
    contentfulGames.updateAndStore(data.game.bggId)
  }

  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <h1 className={`${baseCn}__title`}>Edit Game</h1>
      <Breadcrumbs locations={crumbs} />
      <div>
        <Button onClick={handleRefreshClick} primary>Refresh Data from BGG</Button>
        <Game game={data.game} lists={[]} />
      </div>
      <section className={`${baseCn}__game-summary ${baseCn}__summary`}>
        {data.games.nodes.map(game => (
          <GameBrief key={game.bggId} game={game} type="link" to={`/admin/game/${game.bggId}/`} />
        ))}
      </section>
    </Page>
  )
}

export const query = graphql`
  query AdminGameEditQuery($bggId: Int) {
    game: contentfulGame(bggId: {eq: $bggId}) {
      bggId
      artist
      description {
        description
      }
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
    games: allContentfulGame {
      nodes {
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

export default AdminCreatorEditPage
