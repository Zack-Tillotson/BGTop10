import * as React from "react"
import {Link} from 'gatsby'

import Font from 'atoms/Font'
import Image from 'atoms/Image'

import useContentful from 'contentful/useContentful'

import './creator-form.scss'

const baseCn = 'creator-form'

const creatorFields = [
  {
    id: 'creator-name',
    label: 'Name',
  },
  {
    id: 'creator-slug',
    label: 'Slug',
  },
  {
    id: 'creator-avatar',
    label: 'Image Avatar',
  },
  {
    id: 'creator-banner',
    label: 'Image Banner',
  },
  {
    id: 'creator-description',
    label: 'Description',
    type: 'textarea'
  },
  {
    id: 'creator-links',
    label: 'Links (comma delimited)',
  },
]

const CreatorForm = () => {
  const contentful = useContentful()

  const handleChange = event => {
    const {id, value} = event.target
    const field = creatorFields.find(field => field.id === id)
    contentful.forms.creator.handleChange(field, value)
  }

  return (
    <section className={baseCn}>
      {creatorFields.map(field => (
        <div key={field.id} className={`${baseCn}____input-group`}>
          <Font
            Ele="label"
            level="delta"
            htmlFor={field.id}
            className={`${baseCn}__label`}>
              {field.label}
          </Font>
          <input 
            id={field.id}
            type={field.type || 'text'}
            value={contentful.forms.creator.values[field.id]} 
            onChange={handleChange} 
            className={`${baseCn}__input`} />
        </div>
      ))}
    </section>
  )
}

export default CreatorForm
