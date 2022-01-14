import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'

import {rawToContentful, rawToGraphQl, contentfulToGraphQl} from './mapping/game'
import useAccessToken from './useAccessToken';
import throttler from './throttlePromiser'
import getAttrsFromBgg from './getAttrsFromBgg';

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const ENTRY_TYPE = 'game'

function getEnvironment(accessToken) {
  return createClient({
      accessToken,
  }).getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT_ID))
}

function getEntries(accessToken) {
  return throttler()
    .then(() => getEnvironment(accessToken))
    .then(env => {
      return env.getEntries({content_type: ENTRY_TYPE, limit: 999})
    })
}

const saveEntryWithAccessToken = accessToken => raw => {
  return throttler()
    .then(() => Promise.all([
      getAttrsFromBgg(raw.bggId),
      getEnvironment(accessToken),
    ]))
    .then(([attrs, env]) => {
      const cleanAttrs = rawToContentful(attrs)
      return env.createEntry(ENTRY_TYPE, cleanAttrs)
    })
}

const updateEntryWithAccessToken = accessToken => bggId => {
  return throttler()
    .then(() => Promise.all([
      getAttrsFromBgg(bggId),
      getEnvironment(accessToken).then(env => env.getEntries({content_type: ENTRY_TYPE, 'fields.bggId': bggId})),
    ]))
    .then(([attrs, entries]) => {
      if(entries.total !== 1) throw new Error('entry not found')
      const entry = entries.items[0]
      
      rawToContentful(attrs, {targetObject: entry})

      return entry.update()
    })
}

const useCmsListWithAccessToken = (accessToken, isEnabled) => {
  const [state, updateState] = useState([])
  const [contentfulState, updateContentfulState] = useState([])
  const [random, updateRandom] = useState(0)
  useDebugValue(`state: ${JSON.stringify(state)}`)

  useEffect(() => {
    if(isEnabled) {
      getEntries(accessToken).then(result => {
        const cleaned = result.items.map(contentfulToGraphQl)
        updateState(cleaned)
        updateContentfulState(result.items)
      })
    }
  }, [accessToken, isEnabled, random])

  const forceRefresh = () => updateRandom(Math.random())
  return [state, contentfulState, forceRefresh]
}

export default function useGame(cmsListEnabled = false) {

  const {value} = useAccessToken()
  const createAndStore = saveEntryWithAccessToken(value)
  const updateAndStore = updateEntryWithAccessToken(value)

  const [cmsList, contentfulList, refreshCmsList] = useCmsListWithAccessToken(value, cmsListEnabled)

  return {
    rawToContentful,
    rawToGraphQl,

    cmsList,
    contentfulList,

    createAndStore,
    updateAndStore,

    refreshCmsList,
  }
}