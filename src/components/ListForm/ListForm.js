import React, {useState} from "react"

import Button from 'atoms/Button'
import Font from 'atoms/Font'

import CreatorBrief from "components/CreatorBrief"
import CreatorSelector from "components/CreatorSelector"
import GameSelector from 'components/GameSelector'
import GameBrief from 'components/GameBrief'

import useListForm from 'useListForm'

import './list-form.scss'

const baseCn = 'list-form'

const creatorField = {
  id: 'creator',
  label: 'Select list creator',
}

const staticFields = [
  {
    id: 'name',
    label: 'Name of list',
  },
  {
    id: 'slug',
    label: 'Slug',
  },
  {
    id: 'link',
    label: 'Link to source',
  },
  {
    id: 'image',
    label: 'Thumbnail image',
  },
  {
    id: 'datePublished',
    label: 'Published date',
  },
  {
    id: 'description',
    label: 'Description',
    type: 'textarea',
    otherAttrs: {
      rows: "3",
      col: "50",
    },
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'list-tags',
  },
]

const linkPopNumbersId = 'pop-numbers-input'
const linkPopNamesId = 'pop-names-input'

const ListForm = () => {
  const state = useListForm(true)
  const [isCreatorButtonVisible, updateisCreatorButtonVisible] = useState(!(state.base.value.creator))

  const handleChange = event => {
    const {id, value} = event.target
    const field = staticFields.find(field => field.id === id)
    
    state.base.handleChange(field, value)
  }

  const handleCreatorSelect = creator => {
    state.base.handleChange(creatorField, creator)
    updateisCreatorButtonVisible(false)
  }
  
  const handlePopulateLinksClick = () => {
    state.gameLinks.handleGenerateGameLinks(document.getElementById(linkPopNumbersId).value, document.getElementById(linkPopNamesId).value)
  }

  const handleFieldChange = (field, nextTabId) => val => {
    const value = val.target ? val.target.value : val
    state.gameLinks.handleChange(field, value)
    if(nextTabId) {
      try {
        document.querySelectorAll(`[tabindex="${nextTabId}"]`)[0].focus()
      } catch(e) {}
    }
  }

  const handleTagClick = (field, tag, index) => e => {
    e.preventDefault()
    let value = state.base.value.tags || []
    if(index === -1) {
      value = [...value, tag]
    } else {
      value = [...value]
      value.splice(index, 1)
    }
    state.base.handleChange(field, value)

  }

  const gameLinkFieldsKeys = Object.keys(state.gameLinks.fields)
  const handleSearchInputKeyDown = event => {
    if(event.code !== 'Tab' || !event.altKey) {
      return
    }

    const {person} = event.target.dataset
    const personInputs = [...document.querySelectorAll(`[data-person="${person}"]`)]
    const currentInput = personInputs.findIndex(input => input === event.target)

    if(currentInput < personInputs.length - 1) {
      personInputs[currentInput+1].focus()
      event.preventDefault()
    }
  }

  return (
    <section className={baseCn}>
      <div className={`${baseCn}__creator-section`}>
        <div className={`${baseCn}____input-group ${!isCreatorButtonVisible ? '--hidden' : ''}`}>
          <Font level="delta" className="list-form__input">{creatorField.label}</Font>
          <CreatorSelector onSelect={handleCreatorSelect} buttonProps={{children: "Select", primary: !state.base.value.creator, hollow: !!state.base.value.creator}} />
        </div>
        {state.base.value.creator && (
          <Button onClick={() => updateisCreatorButtonVisible(true)} minimal>
            <CreatorBrief creator={state.base.value.creator} />
          </Button>
        )}
      </div>
      {state.base.value.creator && ( /* Only show the list info after the user has selected a creator */
        <>
          {staticFields.map(field => {
            const CustomEle = field.type || 'input'

            let inputElement
            
            if(field.type === 'list-tags') {
              inputElement = (
                <div className={`${baseCn}__tag-list`}>
                  {state.tags.map(tag => {
                    const index = (state.base.value.tags || []).findIndex(findTag => findTag.slug === tag.slug)
                    return (
                      <Button key={tag.slug} onClick={handleTagClick(field, tag, index)} minimal className={`${index < 0 ? '' : 'admin__nav-item--active'}`}>
                        {tag.display}
                      </Button>
                    )
                  })}
                </div>
              )
            } else {
              inputElement = (
                <CustomEle
                id={field.id}
                type={field.type || 'text'}
                {...(field.otherAttrs || {})}
                value={state.base.value[field.id] || ''} 
                onChange={handleChange} 
                className={`${baseCn}__input`} />
              )
            }

            return (
              <div key={field.id} className={`${baseCn}____input-group`}>
                <Font
                  Ele="label"
                  level="delta"
                  htmlFor={field.id}
                  className={`${baseCn}__label`}>
                    {field.label}
                </Font>
                {inputElement}
              </div>
            )
          })}
          <section className={`${baseCn}__list-games`}>
            <h3>Games</h3>
            <Font level="delta" className={`${baseCn}__list-games-controls`}>
              <div className={`${baseCn}__input-group`}>
                <label htmlFor={linkPopNumbersId}>Numbers</label>
                <input className="list-form__input" id={linkPopNumbersId} type="text" placeholder="Eg. 10-1 or 50-41" />
              </div>
              <div className={`${baseCn}__input-group`}>
                <label htmlFor={linkPopNamesId}>Contributers</label>
                <input className="list-form__input" id={linkPopNamesId} type="text" placeholder="Eg. Nick, Mike" />
              </div>
              <Button onClick={handlePopulateLinksClick} secondary>Generate links</Button>
            </Font>
            {new Array(gameLinkFieldsKeys.length / 4).fill().map((_, index, inputAry) => {
              const titleField = state.gameLinks.fields[gameLinkFieldsKeys[index * 4]]
              const searchField = state.gameLinks.fields[gameLinkFieldsKeys[index * 4 + 1]]
              const gameField = state.gameLinks.fields[gameLinkFieldsKeys[index * 4 + 2]]
              const personField = state.gameLinks.fields[gameLinkFieldsKeys[index * 4 + 3]]
              
              const titleValue = state.gameLinks.value[titleField.id]
              const searchValue = state.gameLinks.value[searchField.id]
              const gameValue = state.gameLinks.value[gameField.id]
              const personValue = state.gameLinks.value[personField.id]

              const tabIndex = 2 * inputAry.length + index + 1
              
              return (
                <div key={titleField.id} className={`${baseCn}__input-row`}>
                  <div  className={`${baseCn}____input-group`}>
                    <Font
                      Ele="label"
                      level="delta"
                      htmlFor={titleField.id}
                      className={`${baseCn}__label`}>
                        {index + 1}. {personValue}
                    </Font>
                    <input
                      id={titleField.id}
                      type={'text'}
                      value={titleValue} 
                      onChange={handleFieldChange(titleField)} 
                      className={`${baseCn}__input`} />
                  </div>
                  <div  className={`${baseCn}__input-group`}>
                    <Font
                      Ele="label"
                      level="delta"
                      htmlFor={searchField.id}
                      className={`${baseCn}__label`}>
                        {searchField.label}
                    </Font>
                    <input
                      id={searchField.id}
                      type={'text'}
                      value={searchValue} 
                      onChange={handleFieldChange(searchField)}
                      onKeyDown={handleSearchInputKeyDown}
                      tabIndex={index+1}
                      className={`${baseCn}__input`} 
                      data-person={personValue} />
                  </div>
                  <div  className={`${baseCn}__input-group`}>
                    <Font
                      level="delta"
                      className={`${baseCn}__label`}>
                        {gameField.label}
                    </Font>
                    <GameSelector 
                      defaultInput={searchValue}
                      onSelect={handleFieldChange(gameField, tabIndex + 1)} 
                      buttonProps={{children: "Select", primary: !gameValue, hollow: !!gameValue, semitight: true, tabIndex}} />
                  </div>
                  <div className={`${baseCn}__input-group`}>
                    {gameValue ? <GameBrief game={gameValue} Element="div" /> : ''}
                  </div>
                </div>
              )
            })}
          </section>
        </>
      )}
    </section>
  )
}

export default ListForm
