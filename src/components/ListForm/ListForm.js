import * as React from "react"

import Button from 'atoms/Button'
import Font from 'atoms/Font'

import CreatorMini from "components/CreatorMini"
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

  return (
    <section className={baseCn}>
      <div className={`${baseCn}____input-group`}>
        <Font level="delta">{creatorField.label}</Font>
        <CreatorSelector onSelect={handleCreatorSelect} buttonProps={{chidlren: "Select", primary: !state.base.value.creator, hollow: !!state.base.value.creator}} />
        {state.base.value.creator && <CreatorMini creator={state.base.value.creator} isLink={false} />}
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
              <label htmlFor={linkPopNumbersId}>Numbers</label>
              <input id={linkPopNumbersId} type="text" placeholder="Eg. 10-1 or 50-41" />
              <label htmlFor={linkPopNamesId}>Contributers</label>
              <input id={linkPopNamesId} type="text" placeholder="Eg. Nick, Mike" />
              <Button onClick={handlePopulateLinksClick} hollow minimal>Generate links</Button>
            </Font>
            {state.gameLinks.fields.map(field => {
              const value = state.gameLinks.value[field.id]
              
              if(field.type === 'game') {
                return (
                  <div key={field.id} className={`${baseCn}____input-group`}>
                    <Font
                      level="delta"
                      className={`${baseCn}__label`}>
                        {field.label}
                    </Font>
                    <GameSelector onSelect={handleFieldChange(field)} buttonProps={{children: "Select", primary: !value, hollow: !!value}} />
                    {value && <GameBrief game={value} Element="div" />}
                  </div>
                )
              }
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
                    value={state.gameLinks.value[field.id] || ''} 
                    onChange={handleFieldChange(field)} 
                    className={`${baseCn}__input`} />
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
