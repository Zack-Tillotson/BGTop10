'use client'

import { Button, FormControl, FormLabel, Input } from '@mui/joy'
import {TagForm as TagFormDataType} from 'board-game-data/client'

import styles from './TagForm.module.scss'
import { SyntheticEvent, ChangeEventHandler} from 'react'

interface TagFormProps {
  formValues: TagFormDataType,
  className?: string,
  onChange: (key: string) => ChangeEventHandler<HTMLInputElement>,
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void,
}

interface Attribute {
  key: keyof(TagFormDataType), 
  display: string,
}

const attributes: Attribute[] = [
  {key: 'display', display: 'Display title (brief)'},
  {key: 'slug', display: 'Slug'},
  {key: 'pageTitle', display: 'Title of the tag page'},
  {key: 'pageSubtitle', display: 'Subtitle for the tag page'},
  {key: 'introduction', display: 'Introduction paragraph displayed on tag page'},
  {key: 'priority', display: 'Priority (higher is more prominent)'},
]

export function TagForm({
  formValues,
  onSubmit,
  onChange,
  className = '',
}: TagFormProps) {
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

export default TagForm;
