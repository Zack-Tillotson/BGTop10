'use client'

import { SyntheticEvent, ChangeEventHandler} from 'react'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Table from '@mui/joy/Table'
import Card from '@mui/joy/Card'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'

import {Creator, RankingFormDataType, Tag} from 'board-game-datatypes'

import styles from './RankingForm.module.scss'

interface RankingFormProps {
  tags: {tag: Tag}[],
  creators: Creator[],
  formValues: RankingFormDataType,
  isFormValid: boolean,
  className?: string,
  onChange: (key: string) => (event: any) => void,
  onPersonChange: (key: string, personIndex: number, gameIndex?: number) => ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>,
  onBggLookupClick: (query: string, context: any) => void,
  onSubmit: (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void,
}

interface Attribute {
  key: keyof(RankingFormDataType), 
  display: string,
  inputType?: string,
}

const coreAttributes: Attribute[] = [
  {key: 'creator', display: 'Creator', inputType: 'creator'},
  {key: 'name', display: 'Name'},
  {key: 'slug', display: 'Slug'},
  {key: 'datePublished', display: 'Date published', inputType: 'date'},
  {key: 'description', display: 'Description', inputType: 'textarea'},
  {key: 'image', display: 'Thumbnail image'},
  {key: 'link', display: 'Youtube URL'},
  {key: 'tag', display: 'Tag', inputType: 'tag'},
]

export function RankingForm({
  formValues,
  tags,
  creators,
  isFormValid,
  onSubmit,
  onChange,
  onPersonChange,
  onBggLookupClick,
  className = '',
}: RankingFormProps) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {coreAttributes.map(({key, display, inputType = 'text'}: Attribute) => (
        <FormControl key={key} className={styles.formControl}>
          <FormLabel htmlFor={`input-${key}`}>
            {display}
          </FormLabel>
          {(inputType === 'text' || inputType === 'date') && (
            <Input
              id={`input-${key}`} 
              type={inputType}
              className={styles.input} 
              value={formValues[key] as unknown as string} 
              onChange={onChange(key)}
            />
          )}
          {inputType === 'textarea' && (
            <Textarea
              id={`input-${key}`} 
              className={styles.input} 
              value={formValues[key] as unknown as string} 
              onChange={onChange(key)}
              minRows="3"
            />
          )}
          {inputType === 'tag' && (
            <Select
              id={`input-${key}`} 
              className={styles.input} 
              onChange={onChange(key)}
              value={formValues[key]}
            >
              {tags.map(({tag}) => (
                <Option
                  key={tag.id}
                  value={tag.id} 
                >
                  {tag.display}
                </Option>
              ))}
            </Select>
          )}
          {inputType === 'creator' && (
            <Select
              id={`input-${key}`} 
              className={styles.input} 
              onChange={onChange(key)}
              value={formValues[key]}
            >
              {creators.map(({name, id}) => (
                <Option
                  key={id}
                  value={id} 
                >
                  {name}
                </Option>
              ))}
            </Select>
          )}
        </FormControl>
      ))}
      <section>
        <h3>Game rankings</h3>
        <Card className={styles.controlSideBySide}>
          <FormControl className={styles.formControl}>
            <FormLabel htmlFor={`input-creatorCount`}>
              Number of reviewers
            </FormLabel>
            <Input
              id={`input-creatorCount`} 
              type="number"
              className={styles.input} 
              value={formValues['creatorCount']} 
              onChange={onChange('creatorCount')}
            />
          </FormControl>
          <FormControl className={styles.formControl}>
            <FormLabel htmlFor={`input-rankingCount`}>
              Games ranked per reviewer
            </FormLabel>
            <Input
              id={`input-rankingCount`} 
              type="number"
              className={styles.input} 
              value={formValues['rankingCount']} 
              onChange={onChange('rankingCount')}
            />
          </FormControl>
        </Card>
        <div className={styles.rankingsList}>
          {formValues.gameLink.map(({person, games}, reviewerIndex) => (
            <section key={reviewerIndex}>
              <FormControl className={styles.formControl}>
                <FormLabel htmlFor={`input-person-${reviewerIndex}`}>
                  Reviewer name
                </FormLabel>
                <Input
                  id={`input-person-${reviewerIndex}`} 
                  type="text"
                  className={styles.input} 
                  value={person} 
                  onChange={onPersonChange('name', reviewerIndex)}
                />
              </FormControl>
              <Table sx={{'& thead th:nth-child(4)': { width: '125px' } }}>
                <thead>
                  <tr>
                    <th></th>
                    <th className={styles.gameNameColumn}>Game name</th>
                    <th></th>
                    <th className={styles.gameIdColumn}>BGG Id</th>
                  </tr>
                </thead>
                <tbody>
                  {[...games].reverse().map(({name, bggId}, reverseIndex) => {
                    const gameIndex = games.length - 1 - reverseIndex
                    return (
                      <tr key={`name-${gameIndex}-name`}>
                        <td># {gameIndex + 1}</td>
                        <td>
                          <FormControl className={styles.formControl}>
                            <Input
                              id={`input-person-${reviewerIndex}-game-${gameIndex}`} 
                              type="text"
                              placeholder="Game name"
                              className={styles.input} 
                              value={name} 
                              onChange={onPersonChange('game', reviewerIndex, gameIndex)}
                            />
                          </FormControl>
                        </td>
                        <td>
                          <Button 
                            variant={bggId ? 'plain' : 'solid'}
                            onClick={() => onBggLookupClick(name, {personIndex: reviewerIndex, gameIndex})}>
                              <span role="img" aria-label="Lookup">🔍</span>
                          </Button>
                        </td>
                        <td key={`name-${gameIndex}-bggId`}>
                          <FormControl className={styles.formControl}>
                            <Input
                              id={`input-person-${reviewerIndex}-game-${gameIndex}-bggId`} 
                              type="text"
                              className={styles.input} 
                              placeholder="BGG Id"
                              value={bggId} 
                              onChange={onPersonChange('bggId', reviewerIndex, gameIndex)}
                            />
                          </FormControl>
                        </td>  
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </section>
          ))}
        </div>
      </section>
      <div className={styles.formControls}>
        <Button className={styles.formControl} variant="solid" type="submit" disabled={!isFormValid}>Preview</Button>
      </div>
    </form>
  )
}
