import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'
import gameMapper from './mapping/game'

import {rawToContentful, rawToGraphQl, contentfulToGraphQl} from './mapping/list'
import useAccessToken from './useAccessToken';
import getAttrsFromBgg from './getAttrsFromBgg'

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const LIST_ENTRY_TYPE = 'list'
const GAME_ENTRY_TYPE = 'game'
const CREATOR_ENTRY_TYPE = 'creator'
const LIST_GAME_LINK_ENTRY_TYPE = 'listGameLink'

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

function getOrAddGames(env, gameStubs) {
  return env.getEntries({content_type: GAME_ENTRY_TYPE})
    .then(entries => {
      console.log('contentful games', entries)
      return Promise.all(gameStubs.map(game => {
        const entry = entries.items.find(entry => entry.fields.bggId['en-US'] == game.bggId)
        if(entry) {
          return Promise.resolve(entry)
        }

        return getAttrsFromBgg(game.bggId)
          .then(attrs => {
            const cleanAttrs = gameMapper.rawToContentful(attrs)
            return env.createEntry(GAME_ENTRY_TYPE, cleanAttrs)
          })
      }))
    })
}

function getCreator(env, creatorStub) {
  return env.getEntries({content_type: CREATOR_ENTRY_TYPE})
    .then(entries => {
      return entries.items.find(entry => entry.fields.slug['en-US'] == creatorStub.slug)
    })
}

function addSimpleList(env, listStub, contentfulCreator) {
  const {listGameLink, creator, ...restListStub} = listStub.fields
  
  const contentfulList = {
    fields: {
      ...restListStub,
      creator: {
        'en-US': {
          sys: {
            id: contentfulCreator.sys.id,
            linkType: 'Entry',
            type: 'Link'
          },
        },
      },
    }
  }

  return env.createEntry(LIST_ENTRY_TYPE, contentfulList)
}

const saveEntryWithAccessToken = accessToken => (rawAttrs, rawGameLinks) => {
  const list = rawToContentful(rawAttrs, rawGameLinks)
  return getEnvironment(accessToken)
    .then(env => {
      return Promise.all([
        env, 
        getOrAddGames(env, list.fields.listGameLink['en-US'].map(link => link.game)),
        getCreator(env, list.fields.creator['en-US']),
      ])
    }).then(([env, contentfulGames, contentfulCreator]) => {
      console.log('base contentful', contentfulGames, contentfulCreator)
      // Create list in Contentful
      return addSimpleList(env, list, contentfulCreator)
      // Create list game links (with game, list references)
      // Update games with game link refs
      // Update list with game link refs
    })
    // .then(env => env.createEntry(LIST_ENTRY_TYPE, rawToContentful(raw)))
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
  const saveEntry = saveEntryWithAccessToken(value)
  const cmsList = useCmsListWithAccessToken(value, cmsListEnabled)

  return {
    rawToContentful,
    rawToGraphQl,
    cmsList,

    saveEntry,
  }
}