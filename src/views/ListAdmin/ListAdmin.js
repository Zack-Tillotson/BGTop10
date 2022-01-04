import React from "react"

import Button from 'atoms/Button'

import ListForm from 'components/ListForm'

import ListMini from 'components/ListMini'
import ListView from 'views/List'

import useListAdmin from "./useListAdmin"
import './list-admin.scss'

const baseCn = 'list-admin'

const ListAdmin = ({Element, className}) => {
  
  const {state, handlers, contentful} = useListAdmin()

  const viewList = contentful.rawToGraphQl(state.form.value)
  
  return (
    <Element className={`${className} ${baseCn}`}>
      {state.isSuccessful !== null && (
        <Button onClick={handlers.clearResultClick} primary={state.isSuccessful} secondary={!state.isSuccessful}>
          {state.isSuccessful ? 'success' : 'error'} - click to close
        </Button>
      )}
      {!state.isReview && (
        <>
          <ListForm />
          <Button onClick={handlers.reviewClick} primary disabled={!state.isValid}>Review and save</Button>
          <Button onClick={handlers.clearClick} minimal>Clear</Button>
        </>
      )}
      
      {state.isReview && (
        <>
          <ListMini creator={viewList} />
          <ListView creator={viewList} />
          <Button onClick={handlers.cancelClick} hollow>Cancel</Button>
          <Button onClick={handlers.saveClick} primary>Save</Button>
        </>
      )}
    </Element>
  )
}

export default ListAdmin
