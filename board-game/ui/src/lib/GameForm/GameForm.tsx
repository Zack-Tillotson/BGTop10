'use client'

import { SyntheticEvent, ChangeEventHandler} from 'react'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'

import {GameFormDataType} from 'board-game-data/hooks/useGameForm'

import styles from './GameForm.module.scss'

interface GameFormProps {
  formValues: GameFormDataType,
  className?: string,
  onChange: (key: string) => ChangeEventHandler<HTMLInputElement>,
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void,
  onUpdateFromBgg: () => void,
}

interface Attribute {
  key: keyof(GameFormDataType), 
  display: string,
}

const attributes: Attribute[] = [
  {key: 'name', display: 'Name'},
  {key: 'yearPublished', display: 'Year published'},
  {key: 'bggId', display: 'BGG Id'},
  {key: 'description', display: 'Description'},
  {key: 'image', display: 'Main image src'},
  {key: 'imageThumbnail', display: 'Thumbnail image src'},
  {key: 'artist', display: 'Artists (bar separated)'},
  {key: 'designer', display: 'Designers (bar separated)'},
  {key: 'family', display: 'Game family/groups (bar separated)'},
  {key: 'mechanic', display: 'Mechanics (bar separated)'},
  {key: 'publisher', display: 'Publishers (bar separated)'},
  {key: 'playTimeAvg', display: 'Average playtime'},
  {key: 'playTimeMax', display: 'Max playtime'},
  {key: 'playTimeMin', display: 'Min playtime'},
  {key: 'playerCountMax', display: 'Max players'},
  {key: 'playerCountMin', display: 'Min players'},
]

export function GameForm({
  formValues,
  onSubmit,
  onChange,
  onUpdateFromBgg,
  className = '',
}: GameFormProps) {
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
        <Button className={styles.formControl} variant="outlined" onClick={onUpdateFromBgg}>Refresh from BGG</Button>
      </div>
    </form>
  )
}
