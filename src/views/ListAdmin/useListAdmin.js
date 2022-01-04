import {useState} from 'react'

import useListForm from 'useListForm'
import useList from 'contentful/useList'

function useListAdmin() {
  const form = useListForm()
  const contentful = useList()

  const [isReview, updateIsReview] = useState(false)
  const [isSuccessful, updateIsSuccessful] = useState(null) // null, true, false

  const reviewClick = event => {
    updateIsReview(true)
  }

  const clearClick = event => {
    form.handleClear()
  }

  const cancelClick = event => {
    updateIsReview(false)
  }

  const saveClick = event => {
    contentful.saveEntry(form.value)
      .then(result => {
        updateIsSuccessful(result)
        if(result) {
          updateIsReview(false)
          form.handleClear()
        }
      })
  }

  const clearResultClick = () => {
    updateIsSuccessful(null)
  }

  return {
    state: {
      form,
      isReview,
      isSuccessful,
    },
    handlers: {
      reviewClick,
      clearClick,
      cancelClick,
      saveClick,
      clearResultClick,
    },
    contentful,
  }
}

export default useListAdmin