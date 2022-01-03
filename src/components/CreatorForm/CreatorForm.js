import * as React from "react"

import Font from 'atoms/Font'

import useCreatorForm from 'useCreatorForm'

import './creator-form.scss'

const baseCn = 'creator-form'

const creatorFields = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'slug',
    label: 'Slug',
  },
  {
    id: 'avatar',
    label: 'Image Avatar',
  },
  {
    id: 'banner',
    label: 'Image Banner',
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
  {
    id: 'links',
    label: 'Links (comma delimited)',
  },
]

const CreatorForm = () => {
  const state = useCreatorForm()

  const handleChange = event => {
    const {id, value} = event.target
    const field = creatorFields.find(field => field.id === id)
    
    state.handleChange(field, value)
  }

  return (
    <section className={baseCn}>
      {creatorFields.map(field => {
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
              value={state.value[field.id] || ''} 
              onChange={handleChange} 
              className={`${baseCn}__input`} />
          </div>
        )
      })}
    </section>
  )
}

export default CreatorForm
