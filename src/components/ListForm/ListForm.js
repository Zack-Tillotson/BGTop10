import * as React from "react"

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
    id: 'description',
    label: 'Description',
    type: 'textarea',
    otherAttrs: {
      rows: "5",
      col: "50",
    },
  },
]

const linkPopNumbersId = 'pop-numbers-input'
const linkPopNamesId = 'pop-names-input'

const ListForm = () => {
  const state = useListForm()

  const handleChange = event => {
    const {id, value} = event.target
    const field = staticFields.find(field => field.id === id)
    
    state.base.handleChange(field, value)
  }

  const handleCreatorSelect = creator => {
    state.base.handleChange(creatorField, creator)
  }
  
  const handlePopulateLinksClick = () => {
    state.gameLinks.handleGenerateGameLinks(document.getElementById(linkPopNumbersId).value, document.getElementById(linkPopNamesId).value)
  }

  const handleFieldChange = field => val => {
    const value = val.target ? val.target.value : val
    state.gameLinks.handleChange(field, value)
  }

  const gameLinkFieldsKeys = Object.keys(state.gameLinks.fields)

  return (
    <section className={baseCn}>
      <div className={`${baseCn}__creator-section`}>
        <div className={`${baseCn}____input-group`}>
          <Font level="delta" className="list-form__input">{creatorField.label}</Font>
          <CreatorSelector onSelect={handleCreatorSelect} buttonProps={{chidlren: "Select", primary: !state.base.value.creator, hollow: !!state.base.value.creator}} />
        </div>
        {state.base.value.creator && <CreatorBrief creator={state.base.value.creator} isLink={false} />}
      </div>
      {state.base.value.creator && ( /* Only show the list info after the user has selected a creator */
        <>
          {staticFields.map(field => {
            const CustomEle = field.type || 'input'
              
            return (
              <div key={field.id} className={`${baseCn}____input-group`}>
                <Font
                  Ele="label"
                  level="delta"
                  htmlFor={field.id}
                  className={`${baseCn}__label`}>
                    {field.label}
                </Font>
                <CustomEle
                  id={field.id}
                  type={field.type || 'text'}
                  {...(field.otherAttrs || {})}
                  value={state.base.value[field.id] || ''} 
                  onChange={handleChange} 
                  className={`${baseCn}__input`} />
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
            {new Array(gameLinkFieldsKeys.length / 2).fill().map((_, index) => {
              const titleField = state.gameLinks.fields[gameLinkFieldsKeys[index * 2]]
              const gameField = state.gameLinks.fields[gameLinkFieldsKeys[index * 2 + 1]]
              
              const titleValue = state.gameLinks.value[titleField.id]
              const gameValue = state.gameLinks.value[gameField.id]
              
              return (
                <div key={titleField.id} className={`${baseCn}__input-row`}>
                  <div  className={`${baseCn}____input-group`}>
                    <Font
                      Ele="label"
                      level="delta"
                      htmlFor={titleField.id}
                      className={`${baseCn}__label`}>
                        {titleField.label}
                    </Font>
                    <input
                      id={titleField.id}
                      type={'text'}
                      value={titleValue} 
                      onChange={handleFieldChange(titleField)} 
                      className={`${baseCn}__input`} />
                  </div>
                  <div  className={`${baseCn}____input-group`}>
                    <Font
                      level="delta"
                      className={`${baseCn}__label`}>
                        {gameField.label}
                    </Font>
                    <GameSelector onSelect={handleFieldChange(gameField)} buttonProps={{children: "Select", primary: !gameValue, hollow: !!gameValue}} />
                  </div>
                  <div className={`${baseCn}__input-group`}>
                    <Font
                      Ele="label"
                      level="delta"
                      htmlFor={titleField.id}
                      className={`${baseCn}__label`}>
                        Selected game
                    </Font>
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