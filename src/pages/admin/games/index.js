import React from "react"
import { graphql } from 'gatsby'
import Breadcrumbs from "layout/Breadcrumbs"
import Page from 'layout/Page'

import GameBrief from "components/GameBrief"

const baseCn = 'admin'
const crumbs = [
  {display: 'Home', url: '/'}, 
  {display: 'Admin', url: '/admin/'}, 
  {display: 'Games', url: '/admin/games/'}
]

const AdminGamesPage = ({location, data}) => {
  
  return (
    <Page crumbs={crumbs} className={baseCn} location={location}>
      <Breadcrumbs locations={crumbs} />
      <h1 className={`${baseCn}__title`}>Games</h1>
      <section className={`${baseCn}__summary`}>
        {data.games.nodes.map(game => (
          <GameBrief key={game.bggId} game={game} type="link" to={`/admin/games/${game.bggId}/`} />
        ))}
      </section>
    </Page>
  )
}

export const query = graphql`
  query AdminGamePageQuery {
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

export default AdminGamesPage
