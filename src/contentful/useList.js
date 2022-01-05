import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'

import {rawToContentful, rawToGraphQl, contentfulToGraphQl} from './mapping/list'

import useAccessToken from './useAccessToken';
import throttler from './throttlePromiser'

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const ENTRY_TYPE = 'list'

function getEnvironment(accessToken) {
  return throttler()
    .then(() => createClient({accessToken}).getSpace(SPACE_ID))
    .then(space => space.getEnvironment(ENVIRONMENT_ID))
}

function getEntries(accessToken) {
  return getEnvironment(accessToken)
    .then(env => {
      return env.getEntries({content_type: ENTRY_TYPE})
    })
}

const saveEntryWithAccessToken = accessToken => (rawAttrs, cmsCreator, cmsGames) => {
  const list = rawToContentful(rawAttrs, cmsCreator, cmsGames)
  list.fields.description['en-US'] = list.fields.description['en-US'].description
  return getEnvironment(accessToken)
    .then(env => env.createEntry(ENTRY_TYPE, list))
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

export default function useList(cmsListEnabled = false) {

  const {value} = useAccessToken()
  const cmsList = useCmsListWithAccessToken(value, cmsListEnabled)
  const saveEntry = saveEntryWithAccessToken(value)

  return {
    rawToContentful,
    rawToGraphQl,

    cmsList,

    saveEntry,
  }
}