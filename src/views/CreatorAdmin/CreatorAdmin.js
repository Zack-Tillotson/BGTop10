import React from "react"

import Button from 'atoms/Button'

import CreatorMini from 'components/CreatorMini'
import CreatorForm from 'components/CreatorForm'

import CreatorView from 'views/Creator'

import useCreatorAdmin from "./useCreatorAdmin"

import './creator-admin.scss'

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
      {!state.isReview && (
        <>
          <CreatorForm />
          <div className="creator-admin__controls">
            <Button onClick={handlers.reviewClick} primary>Review and save</Button>
            <Button onClick={handlers.clearClick} minimal>Clear</Button>
          </div>
        </>
      )}
      
      {state.isReview && (
        <>
          <CreatorMini creator={viewCreator} />
          <CreatorView creator={viewCreator} />
          <div className="creator-admin__controls">
            <Button onClick={handlers.cancelClick} hollow>Cancel</Button>
            <Button onClick={handlers.saveClick} primary>Save</Button>
          </div>
        </>
      )}
    </Element>
  )
}

export default CreatorAdmin
