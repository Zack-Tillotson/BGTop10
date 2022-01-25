import {useState, useEffect} from 'react'

import useListForm from 'useListForm'
import useListGames from 'useListGames'
import useList from 'contentful/useList'
import useGame from 'contentful/useGame'
import useCreator from 'contentful/useCreator'
import useTags from 'contentful/useTags'

function useListAdmin(editTarget) {
  const listGames = useListGames(editTarget)
  const contentful = useList(editTarget)
  const contentfulCreator = useCreator(true)
  const contentfulGames = useGame(true)
  const contentfulTags = useTags(true)

  const form = useListForm()

  const [step, updateStep] = useState('form') // form, games, review
  const [isSuccessful, updateIsSuccessful] = useState(null) // null, true, false

  useEffect(() => {
    form.hydrate(editTarget, listGames)
  }, [editTarget, contentful.cmsList])

  const gameStubs = Object.values(form.gameLinks.value)
    .filter(a => a instanceof Object) // objects are games
    .sort((a, b) => a.bggId - b.bggId)
    .filter((item, index, self) => index === 0 || item.bggId != self[index - 1].bggId)

  const foundCmsGames = []
  const missingStubs = []
  gameStubs.forEach(stub => {
    const cmsGame = contentfulGames.cmsList.find(cmsGame => cmsGame.bggId == Number(stub.bggId))
    if(cmsGame) {
      foundCmsGames.push(cmsGame)
    } else {
      missingStubs.push(stub)
    }
  })
  
  const nextStep = event => {
    if(step === 'form') {
      updateStep('games')
    } else {
      updateStep('review')
    }
  }

  const clearClick = event => {
    form.handleClear()
  }

  const previousStep = event => {
    if(step === 'review') {
      updateStep('games')
    } else {
      updateStep('form')
    }
  }

  const saveClick = event => {
    const rawList = contentful.rawToGraphQl(form.combinedValue)

    const creator = contentfulCreator.contentfulList.find(item => item.fields.slug['en-US'] == rawList.creator.slug)
    const tags = form.base.value.tags.map(rawTag => contentfulTags.contentfulList.find(list => list.fields.slug['en-US'] === rawTag.slug))

    const editTargetSlug = editTarget ? editTarget.slug : ''

    contentful.saveEntry(rawList, creator, tags, editTargetSlug)
      .then(result => {
        updateIsSuccessful(result)
        if(result) {
          updateStep('form')
          form.handleClear()
        }
      })
  }

  const clearResultClick = () => {
    updateIsSuccessful(null)
  }

  const loadMissingStubGames = () => {
    Promise.all(missingStubs.map(stub => contentfulGames.createAndStore(stub)))
      .then(() => contentfulGames.refreshCmsList())
  }

  return {
    state: {
      form,
      step,
      isSuccessful,
    },
    handlers: {
      nextStep,
      previousStep,
      clearClick,
      saveClick,
      clearResultClick,
      loadMissingStubGames,
    },
    contentful,
    games: {
      foundCmsGames,
      missingStubs,
    }
  }
}

export default useListAdmin