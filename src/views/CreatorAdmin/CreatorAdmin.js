import React from "react"

import Button from 'atoms/Button'

import CreatorMini from 'components/CreatorMini'
import CreatorForm from 'components/CreatorForm'

import CreatorView from 'views/Creator'

import useCreatorAdmin from "./useCreatorAdmin"

const baseCn = 'creator-admin'

const CreatorAdmin = ({Element, className}) => {
  
  const {state, handlers, contentful} = useCreatorAdmin()

  const viewCreator = contentful.rawToGraphQl(state.form.value)
  
  return (
    <Element className={`${className} ${baseCn}`}>
      {state.isSuccessful !== null && (
        <Button onClick={handlers.clearResultClick} primary={state.isSuccessful} secondary={!state.isSuccessful}>
          {state.isSuccessful ? 'success' : 'error'} - click to close
        </Button>
      )}
      <h3>Add new creator</h3>
      {!state.isReview && (
        <>
          <CreatorForm />
          <Button onClick={handlers.reviewClick} primary disabled={!state.isValid}>Review and save</Button>
          <Button onClick={handlers.clearClick} minimal>Clear</Button>
        </>
      )}
      
      {state.isReview && (
        <>
          <CreatorMini creator={viewCreator} />
          <CreatorView creator={viewCreator} />
          <Button onClick={handlers.cancelClick} hollow>Cancel</Button>
          <Button onClick={handlers.saveClick} primary>Save</Button>
        </>
      )}
    </Element>
  )
}

export default CreatorAdmin
