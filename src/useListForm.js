import slugify from 'slugify'
import usePersistentState from 'usePersistentState'

const STATE_NAME = 'contentful-list-form'
const DEFAULT_VALUE = {}

const LINK_FIELD_ID = 'list-game-link'
const LINK_FIELDS_NAME = 'contentful-list-form-link-fields'
const LINK_FIELDS_DEFAULT_VALUE = []

const LINK_STATE_NAME = 'contentful-list-form-link-state'
const LINK_STATE_DEFAULT_VALUE = []

function useListForm() {
  const formState = usePersistentState(STATE_NAME, DEFAULT_VALUE)
  const linkFields = usePersistentState(LINK_FIELDS_NAME, LINK_FIELDS_DEFAULT_VALUE)
  const linkState = usePersistentState(LINK_STATE_NAME, LINK_STATE_DEFAULT_VALUE)

  const handleBaseChange = (field, value) => {
    const newValue = {...formState.value, [field.id]: value}

    if(field.id === 'name') {
      newValue.slug = slugify(`${newValue.creator.name} ${value}`, {lower: true})
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
    if(namesAry.length === 0) {
      namesAry.push('')
    }
    const linksAry = []
    numbersAry.forEach(number => {
      namesAry.forEach(name => {
        linksAry.push(`#${number} ${name}`.trim())
      })
    })

    const fieldAry = []
    const newLinkState = {}
    linksAry.forEach((link, index) => {
      const titleId = `${LINK_FIELD_ID} ${index} title`
      const gameId = `${LINK_FIELD_ID} ${index} game`
      fieldAry.push(
        {
          id: titleId,
          label: `Title #${index+1}`,
        }, {
          id: gameId,
          label: `Game`,
          type: 'game',
        },
      )
      newLinkState[titleId] = link
      newLinkState[gameId] = linkState[gameId] || undefined
    })
    
    linkFields.updateValue(fieldAry)
    linkState.updateValue(newLinkState)
    
  }

  return {
    base: {
      value: formState.value,
      handleChange: handleBaseChange,
    },
    gameLinks: {
      fields: linkFields.value,
      value: linkState.value,
      handleChange: handleGameLinksChange,
      handleGenerateGameLinks,
    },
    
    handleClear,
  }
}

export default useListForm