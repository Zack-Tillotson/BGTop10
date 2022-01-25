import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'

import {rawToContentful, rawToGraphQl, contentfulToGraphQl} from './mapping/tag'
import useAccessToken from './useAccessToken';

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const ENTRY_TYPE = 'tag'

function getEnvironment(accessToken) {
  return createClient({
      accessToken,
  }).getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT_ID))
}

function getEntries(accessToken) {
  return getEnvironment(accessToken)
    .then(env => {
      return env.getEntries({content_type: ENTRY_TYPE})
    })
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

export default function useTags(cmsListEnabled = false) {

  const {value} = useAccessToken()
  const [cmsList, contentfulList] = useCmsListWithAccessToken(value, cmsListEnabled)

  return {    
    cmsList,
    contentfulList,
  }
}