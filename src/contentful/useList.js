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

const handleSave = (accessToken, fullList) => (rawList, cmsCreator, editSlug) => {
  if(!editSlug) {
    return saveEntry(accessToken, rawList, cmsCreator)
  }

  const item = fullList.find(item => item.fields.slug['en-US'] == editSlug)
  if(!item) throw  new Error('Unable to find item to edit')

  const updatedItem = rawToContentful(rawList, {cmsCreator , updateObject: item})
  return updatedItem.update()
}


const saveEntry = (accessToken, rawAttrs, cmsCreator) => {
  const list = rawToContentful(rawAttrs, {cmsCreator})
  
  return getEnvironment(accessToken)
    .then(env => env.createEntry(ENTRY_TYPE, list))
}

const useCmsListWithAccessToken = (accessToken, isEnabled) => {
  const [state, updateState] = useState([])
  const [contentfulState, updateContentfulState] = useState([])
  useDebugValue(`state: ${JSON.stringify(state)} ${JSON.stringify(contentfulState)}`)

  useEffect(() => {
    if(isEnabled) {
      getEntries(accessToken).then(result => {
        updateContentfulState(result.items)

        const cleaned = result.items.map(contentfulToGraphQl)
        updateState(cleaned)
      })
    }
  }, [accessToken, isEnabled])
  return [state, contentfulState]
}

export default function useList(cmsListEnabled = false) {

  const {value} = useAccessToken()
  const [cmsList, contentfulList] = useCmsListWithAccessToken(value, cmsListEnabled)
  const saveEntry = handleSave(value, contentfulList)

  return {
    rawToContentful,
    rawToGraphQl,

    cmsList,

    saveEntry,
  }
}