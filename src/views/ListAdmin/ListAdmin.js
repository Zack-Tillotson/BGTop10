import React from "react"

import Button from 'atoms/Button'

import ListForm from 'components/ListForm'
import ListMini from 'components/ListMini'
import GameBrief from 'components/GameBrief'
import GameMini from 'components/GameMini'

import ListView from 'views/List'

import useListAdmin from "./useListAdmin"
import './list-admin.scss'

const baseCn = 'list-admin'

const ListAdmin = ({Element, className}) => {
  
  const {state, handlers, contentful, games} = useListAdmin()

  const viewList = contentful.rawToGraphQl(state.form.combinedValue)
  
  return (
    <Element className={`${className} ${baseCn}`}>
      {state.isSuccessful !== null && (
        <Button onClick={handlers.clearResultClick} primary={state.isSuccessful} secondary={!state.isSuccessful}>
          {state.isSuccessful ? 'success' : 'error'} - click to close
        </Button>
      )}
      {state.step === 'form' && (
        <>
          <ListForm />
          <div className={`${baseCn}__controls`}>
            <Button onClick={handlers.clearClick} minimal>Clear</Button>
            <Button onClick={handlers.nextStep} primary>Next: load game info</Button>
          </div>
        </>
      )}

      {state.step === 'games' && (
        <>
          {games.foundCmsGames.length > 0 && (<h4>Games already in CMS</h4>)}
          {games.foundCmsGames.map(game => <GameMini key={game.bggId} game={game} Element="div" />)}
          {games.foundCmsGames.length > 0 && (<h4>Games to be added</h4>)}
          {games.missingStubs.map(game => <GameBrief key={game.bggId} game={game} Element="div" />)}
          {games.missingStubs.length > 0 && (
            <Button onClick={handlers.loadMissingStubGames} primary>Load games</Button>
          )}
          <div className={`${baseCn}__controls`}>
            <Button onClick={handlers.previousStep} hollow>Go back: list form</Button>
            <Button onClick={handlers.nextStep} primary={games.missingStubs.length === 0} disabled={games.missingStubs.length !== 0}>Next: review and save</Button>
          </div>
        </>
      )}
      
      {state.step === 'review' && (
        <>
          <ListMini list={viewList} />
          <ListView list={viewList} />
          <div className={`${baseCn}__controls`}>
            <Button onClick={handlers.previousStep} hollow>Go back: load game info</Button>
            <Button onClick={handlers.saveClick} primary>Save</Button>
          </div>
        </>
      )}
    </Element>
  )
}

export default ListAdmin
