import slugify from 'slugify'

import usePersistentState from 'usePersistentState'
import useTags from 'contentful/useTags'

const STATE_NAME = 'contentful-list-form'
const DEFAULT_VALUE = {}

const LINK_FIELD_ID = 'list-game-link'
const LINK_FIELDS_NAME = 'contentful-list-form-link-fields'
const LINK_FIELDS_DEFAULT_VALUE = []

const LINK_STATE_NAME = 'contentful-list-form-link-state'
const LINK_STATE_DEFAULT_VALUE = []

function buildStateObjects(linksAry, gamesAry = [], searchAry = [], personAry = []) {
  const fieldAry = []
  const newLinkState = {}
  linksAry.forEach((link, index) => {
    const titleId = `${LINK_FIELD_ID} ${index} title`
    const gameSearchId = `${LINK_FIELD_ID} ${index} search`
    const gameId = `${LINK_FIELD_ID} ${index} game`
    const personId = `${LINK_FIELD_ID} ${index} person`
    fieldAry.push(
      {
        id: titleId,
        label: `Title #${index+1}`,
      }, {
        id: gameSearchId,
        label: `Search game name`,
      }, {
        id: gameId,
        label: `Game`,
        type: 'game',
      }, {
        id: personId,
        label: `Person`,
      },
    )
    newLinkState[titleId] = link
    newLinkState[gameSearchId] = searchAry[index] || ''
    newLinkState[gameId] = gamesAry[index] || undefined
    newLinkState[personId] = personAry[index] || ''
  })

  return [fieldAry, newLinkState]
}

function useListForm() {
  const tags = useTags(true)

  const formState = usePersistentState(STATE_NAME, DEFAULT_VALUE)
  const linkFields = usePersistentState(LINK_FIELDS_NAME, LINK_FIELDS_DEFAULT_VALUE)
  const linkState = usePersistentState(LINK_STATE_NAME, LINK_STATE_DEFAULT_VALUE)

  const combinedValue = {
    ...formState.value,
    games: (linkFields.value || []).filter(field => field.type === 'game')
      .map(field => linkState.value[field.id]),
    gameLink: (linkFields.value || []).filter(field => field.type === 'game')
      .map(field => {
        const value = (linkState.value[field.id] || {}).bggId || 0
        return {
          title: linkState.value[field.id.replaceAll(' game', ' title')],
          bggId: Number(value),
          person: linkState.value[field.id.replaceAll(' game', ' person')],
        }
    }),
  }

  const hydrateForm = (list, games) => {
    if(!list) return

    formState.updateValue({
      name: list.name,
      slug: list.slug,
      description: list.description.description,
      image: list.image,
      link: list.link,
      creator: list.creator,
      datePublished: list.datePublished,
      tags: list.tags,
    })

    const titleAry = list.gameLink.map(gameLink => gameLink.title)
    const gamesAry = list.gameLink
      .map(gameLink => gameLink.bggId)
      .map(bggId => games.find(game => game.bggId === bggId))
    const personAry = list.gameLink.map(gameLink => gameLink.person)

    const [fieldAry, newLinkState] = buildStateObjects(titleAry, gamesAry, undefined, personAry)
    
    linkFields.updateValue(fieldAry)
    linkState.updateValue(newLinkState)
    
  }

  const handleBaseChange = (field, value) => {
    const newValue = {...formState.value, [field.id]: value}

    if(field.id === 'name') {
      newValue.slug = slugify(`${newValue.creator.name} ${value}`, {lower: true, strict: true})
    }

    if(field.id === 'datePublished') {
      const date = new Date(value)
      if(!isNaN(date)) {
        newValue.datePublished = `${date.getUTCFullYear()}-${date.getUTCMonth()<9?'0':''}${date.getUTCMonth()+1}-${date.getUTCDate()<10?'0':''}${date.getUTCDate()}`
      }
    }

    formState.updateValue(newValue)
  }

  const handleClear = () => {
    formState.updateValue(DEFAULT_VALUE)
    linkFields.updateValue(LINK_FIELDS_DEFAULT_VALUE)
    linkState.updateValue(LINK_STATE_DEFAULT_VALUE)
  }

  const handleGameLinksChange = (field, value) => {
    const newValue = {...linkState.value, [field.id]: value}
    linkState.updateValue(newValue)
  }

  const handleGenerateGameLinks = (numbers, names) => {
    const numbersValue = numbers || '10-1'
    const maxNum = (numbersValue).split('-')[0]
    const minNum = (numbersValue).split('-')[1]
    const numbersAry = new Array(maxNum - minNum + 1).fill().map((_, index) => maxNum - index)
    
    const namesAry = names.split(',').map(num => num.trim()).filter(num => num !== '')
    const personAry = []
    if(namesAry.length === 0) {
      namesAry.push('')
    }
    const linksAry = []
    numbersAry.forEach(number => {
      namesAry.forEach(name => {
        linksAry.push(`#${number} ${name}`.trim())
        personAry.push(name)
      })
    })

    const gamesAry = Object.keys(linkState.value).filter(key => key.indexOf(' game') >= 0).map(key => linkState.value[key])
    const searchAry = Object.keys(linkState.value).filter(key => key.indexOf(' search') >= 0).map(key => linkState.value[key])
    
    const [fieldAry, newLinkState] = buildStateObjects(linksAry, gamesAry, searchAry, personAry)
    
    linkFields.updateValue(fieldAry)
    linkState.updateValue(newLinkState)
    
  }

  const handlePaste = event => {
    const stringData = event.clipboardData.getData('text')
    const gameArray = stringData.split('\n')

    if(gameArray.length < 2) {
      return
    }

    const timeStampRegex = /[0-9][0-9]:[0-9][0-9] (.*$)/
    const cleanGameArray = gameArray.map(gameString => {
      const match = gameString.match(timeStampRegex)
      if(match) {
        return match[1]
      }
      return gameString
    })
    
    const [fieldAry, newLinkState] = buildStateObjects(
      new Array(cleanGameArray.length).fill(0).map((_, index) => `#${cleanGameArray.length - index}`), 
      [], 
      cleanGameArray,
    )
    
    linkFields.updateValue(fieldAry)
    linkState.updateValue(newLinkState)
  }

  return {
    tags: tags.cmsList,
    base: {
      value: formState.value,
      handleChange: handleBaseChange,
    },
    gameLinks: {
      fields: linkFields.value,
      value: linkState.value,
      handleChange: handleGameLinksChange,
      handleGenerateGameLinks,
      handlePaste,
    },
    combinedValue,

    hydrate: hydrateForm,

    handleClear,
  }
}

export default useListForm