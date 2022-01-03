import React, {useState} from "react"
import { Link, graphql } from 'gatsby'

import Button from 'atoms/Button'
import Font from 'atoms/Font'
import Page from 'layout/Page'

import CreatorMini from 'components/CreatorMini'
import CreatorForm from 'components/CreatorForm'
import CreatorView from 'views/Creator'

import useCreatorAdmin from "./useCreatorAdmin"

const baseCn = 'creator-admin'

const CreatorAdmin = ({Element, className}) => {
  
  const {state, handlers, viewCreator} = useCreatorAdmin()
  
  return (
    <Element className={className}>
      {state.isSuccessful !== null && (
        <Button onClick={handlers.resultClear} primary={state.isSuccessful} secondary={!state.isSuccessful}>
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
