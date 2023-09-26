'use client'

import { Button, FormControl, FormLabel, Input } from '@mui/joy'
import {RankingForm as RankingFormDataType} from 'board-game-data/client'

import styles from './RankingForm.module.scss'
import { SyntheticEvent, ChangeEventHandler} from 'react'

interface RankingFormProps {
  formValues: RankingFormDataType,
  className?: string,
  onChange: (key: string) => ChangeEventHandler<HTMLInputElement>,
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void,
}

interface Attribute {
  key: keyof(RankingFormDataType), 
  display: string,
}

const attributes: Attribute[] = [
  {key: 'name', display: 'Name'},
  {key: 'slug', display: 'Slug'},
  {key: 'datePublished', display: 'Date published'},
]

export function RankingForm({
  formValues,
  onSubmit,
  onChange,
  className = '',
}: RankingFormProps) {
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
        <Button className={styles.formControl} variant="solid" type="submit">Preview</Button>
      </div>
    </form>
  )
}

export default RankingForm;
