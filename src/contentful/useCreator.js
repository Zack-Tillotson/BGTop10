import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'

import {rawToContentful, rawToGraphQl, contentfulToGraphQl} from './mapping/creator'
import useAccessToken from './useAccessToken';

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const CREATOR_ENTRY_TYPE = 'creator'

function getEnvironment(accessToken) {
  return createClient({
      accessToken,
  }).getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT_ID))
}

function getEntries(accessToken) {
  return getEnvironment(accessToken)
    .then(env => {
      return env.getEntries({content_type: CREATOR_ENTRY_TYPE})
    })
}

const saveEntryWithAccessToken = accessToken => rawCreator => {
  return getEnvironment(accessToken)
    .then(env => env.createEntry(CREATOR_ENTRY_TYPE, rawToContentful(rawCreator)))
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
  }, [accessToken, isEnabled])
  return state
}

export default function useCreator(cmsListEnabled = false) {

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