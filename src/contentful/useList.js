import {useState, useEffect, useDebugValue} from 'react'
import { createClient } from 'contentful-management'
import gameMapper from './mapping/game'
import gameLinksMapper from './mapping/gameLinks'

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

function creatListGameLinks(env, linkStubs, list, games) {
  return Promise.all(linkStubs.map(link => {
    const {game, title} = link
    const contentfulGame = games.find(findGame => findGame.fields.bggId['en-US'] == game.bggId)
  
    const contentfulLink = {
      fields: {
        title: {
          'en-US': title,
        },
        list: {
          'en-US': {
            sys: {
              id: list.sys.id,
              linkType: 'Entry',
              type: 'Link'
            },
          },
        },
        game: {
          'en-US': {
            sys: {
              id: contentfulGame.sys.id,
              linkType: 'Entry',
              type: 'Link'
            },
          },
        },
      }
    }
    return env.createEntry(LIST_GAME_LINK_ENTRY_TYPE, contentfulLink)
  }))
}

function updateGamesWithLinks(env, contentfulGames, contentfulListGameLinks) {
  return contentfulGames.map(game => {
    if(!game.fields.listGameLink) {
      game.fields.listGameLink = {'en-US': []}
    }
    const link = contentfulListGameLinks.find(searchLink => searchLink.fields.game['en-US'].sys.id === game.sys.id)
    if(!link) throw new Error('game not found to link', game, contentfulListGameLinks)

    game.fields.listGameLink['en-US'].push({
      sys: {
        id: link.sys.id,
        linkType: 'Entry',
        type: 'Link'
      },
    })
    return game.update()
  })
}

function updateListWithListGameLinks(env, contentfulList, contentfulListGameLinks) {
  if(!contentfulList.fields.listGameLink) {
    contentfulList.fields.listGameLink = {'en-US': []}
  }
  
  contentfulList.fields.listGameLink['en-US'].push(...contentfulListGameLinks.map(link => ({
    sys: {
      id: link.sys.id,
      linkType: 'Entry',
      type: 'Link'
    },
  })))
  return contentfulList.update()
}

function updateCreatorWithList(env, contentfulCreator, contentfulList) {
  if(!contentfulCreator.fields.list) {
    contentfulList.fields.list = {'en-US': []}
  }
  
  contentfulCreator.fields.list['en-US'].push({
    sys: {
      id: contentfulList.sys.id,
      linkType: 'Entry',
      type: 'Link'
    },
  })
  return contentfulCreator.update()
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
      return Promise.all([
        env, 
        contentfulGames, 
        contentfulCreator,
        addSimpleList(env, list, contentfulCreator),
      ])
    }).then(([env, contentfulGames, contentfulCreator, contentfulList]) => {
      return Promise.all([
        env, 
        contentfulGames, 
        contentfulCreator,
        contentfulList,
        creatListGameLinks(env, list.fields.listGameLink['en-US'], contentfulList, contentfulGames),
      ])
    }).then(([env, contentfulGames, contentfulCreator, contentfulList, contentfulListGameLinks]) => {
      return Promise.all([
        ...updateGamesWithLinks(env, contentfulGames, contentfulListGameLinks),
        updateListWithListGameLinks(env, contentfulList, contentfulListGameLinks),
        updateCreatorWithList(env, contentfulCreator, contentfulList)
      ])
    })
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