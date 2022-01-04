import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'

import {rawToContentful, rawToGraphQl, contentfulToGraphQl} from './mapping/list'
import useAccessToken from './useAccessToken';

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const LIST_ENTRY_TYPE = 'list'

function getEnvironment(accessToken) {
  return createClient({
      accessToken,
  }).getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT_ID))
}

function getEntries(accessToken) {
  return getEnvironment(accessToken)
    .then(env => {
      return env.getEntries({content_type: LIST_ENTRY_TYPE})
    })
}

const saveEntryWithAccessToken = accessToken => raw => {
  return getEnvironment(accessToken)
    .then(env => env.createEntry(LIST_ENTRY_TYPE, rawToContentful(raw)))
}

const useCmsListWithAccessToken = (accessToken, isEnabled) => {
  const [state, updateState] = useState([])
  useDebugValue(`state: ${JSON.stringify(state)}`)

  useEffect(() => {
    if(isEnabled) {
      getEntries(accessToken).then(result => {
        const cleaned = result.items.map(contentfulToGraphQl)
        updateState(cleaned)
      })
    }
  }, [isEnabled])
  return state
}

export default function useList(cmsListEnabled = false) {

  const {value} = useAccessToken()
  const saveEntry = saveEntryWithAccessToken(value)
  const cmsList = useCmsListWithAccessToken(value, cmsListEnabled)

  return {
    rawToContentful,
    rawToGraphQl,
    cmsList,

    saveEntry,
  }
}