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

const saveEntry = (accessToken, rawCreator) => {
  return getEnvironment(accessToken)
    .then(env => env.createEntry(CREATOR_ENTRY_TYPE, rawToContentful(rawCreator)))
}

const handleSave = (accessToken, list) => (rawCreator, editSlug) => {
  if(!editSlug) {
    return saveEntry(accessToken, rawCreator)
  }

  const item = list.find(item => item.fields.slug['en-US'] == editSlug)
  if(!item) throw  new Error('Unable to find item to edit')

  const updatedItem = rawToContentful(rawCreator, item)
  return updatedItem.update()
}

const useCmsListWithAccessToken = (accessToken, isEnabled) => {
  const [state, updateState] = useState([])
  const [contentfulState, updateContentfulState] = useState([])
  useDebugValue(`state: ${JSON.stringify(state)}`)

  useEffect(() => {
    if(isEnabled) {
      getEntries(accessToken).then(result => {
        const cleaned = result.items.map(contentfulToGraphQl)
        updateState(cleaned)
        updateContentfulState(result.items)
      })
    }
  }, [accessToken, isEnabled])
  return [state, contentfulState]
}

export default function useCreator(cmsListEnabled = false) {

  const {value} = useAccessToken()
  const [cmsList, contentfulList] = useCmsListWithAccessToken(value, cmsListEnabled)
  const saveEntry = handleSave(value, contentfulList)

  return {
    rawToContentful,
    rawToGraphQl,
    
    cmsList,
    contentfulList,

    saveEntry,
  }
}