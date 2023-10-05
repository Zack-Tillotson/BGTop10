'use client'

import { Button, FormControl, FormLabel, Input } from '@mui/joy'
import {CreatorFormDataType} from 'board-game-data/client'

import styles from './CreatorForm.module.scss'
import { SyntheticEvent, ChangeEventHandler} from 'react'

interface CreatorFormProps {
  formValues: CreatorFormDataType,
  className?: string,
  onChange: (key: string) => ChangeEventHandler<HTMLInputElement>,
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void,
}

interface Attribute {
  key: keyof(CreatorFormDataType), 
  display: string,
}

const attributes: Attribute[] = [
  {key: 'name', display: 'Channel name'},
  {key: 'slug', display: 'Slug'},
  {key: 'description', display: 'Description'},
  {key: 'imageAvatar', display: 'Avatar image src'},
  {key: 'imageBanner', display: 'Banner image src'},
  {key: 'link', display: 'External links (comma separated)'},
]

export function CreatorForm({
  formValues,
  onSubmit,
  onChange,
  className = '',
}: CreatorFormProps) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {attributes.map(({key, display}: Attribute) => (
      <FormControl key={key} className={styles.formControl}>
          <FormLabel htmlFor={`input-${key}`}>{display}</FormLabel>
          <Input
            id={`input-${key}`} 
            type="text" 
            className={styles.input} 
            value={formValues[key]} 
            onChange={onChange(key)}
          />
        </FormControl>
      ))}
      <div className={styles.formControls}>
        <Button variant="solid" type="submit">Preview</Button>
      </div>
    </form>
  )
}
