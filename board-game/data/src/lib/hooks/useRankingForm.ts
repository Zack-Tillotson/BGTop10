'use client'

import { Creator, Ranking } from "board-game-datatypes"
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import { submitForm } from "../fetch/submitForm";
import useBggNameIdCache from "./useBggNameIdCache";

export interface RankingFormDataType {
  id: string,
  creatorSlug: string,
  creator: string,
  name: string,
  slug: string,
  datePublished: string,
  description: string,
  link: string,
  image: string,
  tag: string,
  creatorCount: number,
  rankingCount: number,
  gameLink: {person: string, games: {name: string, bggId: number, isCached: boolean}[]}[],
}

function buildRankingForm(creators: Creator[], ranking?: Ranking) {
  if(!ranking) {
    return {
      id: '',
      creator: '',
      creatorSlug: '',
      name: '',
      slug: '',
      datePublished: '',
      description: '',
      link: '',
      image: '',
      tag: '',
      creatorCount: 1,
      rankingCount: 10,
      gameLink: [{person: '', games: new Array(10).fill(null).map(_ => ({name: '', bggId: 0, isCached: false}))}],
    }
  }

  const creator = creators.find(creator => creator.id === ranking.creator)
  const creatorSlug = creator?.slug || ''
    
  return {
    id: ranking.id || '',
    creator: ranking.creator,
    creatorSlug,
    name: ranking.name,
    slug: ranking.slug,
    datePublished: ranking.datePublished,
    description: ranking.description,
    link: ranking.link,
    image: ranking.image,
    tag: ranking.tag,
    creatorCount: ranking.gameLink.length,
    rankingCount: ranking.gameLink[0].games.length,
    gameLink: ranking.gameLink.map(({person, games}) => ({person, games: games.map(bggId => ({name: '', bggId, isCached: false}))})),
  }
}

function buildRanking(form: RankingFormDataType, id?: string) {
  return {
    id: id || '',
    creator: form.creator,
    name: form.name,
    slug: form.slug,
    datePublished: form.datePublished,
    description: form.description,
    link: form.link,
    image: form.image,
    tag: form.tag,
    gameLink: form.gameLink.map(({person, games}) => ({person, games: games.map(({bggId}) => bggId)})),
  }
}

const REQUIRED_FIELDS = ['creator', 'name', 'slug', 'datePublished', 'description', 'link', 'image', 'tag']
function validateFormValues(formValues: RankingFormDataType) {

  // Ensure all form values are non-empty
  if(REQUIRED_FIELDS.filter(key => !((formValues as any)[key])).length) {
    return false
  }

  // Ensure all games have BGG Ids
  if(formValues.gameLink.filter(({person, games}) => !person || games.find(({bggId}) => !bggId)).length) {
    return false
  }

  return true
}

export function useRankingForm(creators: Creator[], ranking?: Ranking) {
  const rankingForm = buildRankingForm(creators, ranking)
  const [formValues, updateFormValues] = useState(rankingForm)
  const [isPreview, updateIsPreview] = useState(false)
  const [isLoading, updateIsLoading] = useState(false)
  const router = useRouter()
  const bggCache = useBggNameIdCache()

  const formRanking = buildRanking(formValues, ranking?.id)
  const isFormValid = validateFormValues(formValues)

  const handleSubmit = useCallback((event:  SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    updateIsPreview(true)
  }, [])

  const handleCancel = useCallback(() => {
    updateIsPreview(false)
  }, [])

  const handleConfirm = useCallback(() => {
    updateIsPreview(false)
    updateIsLoading(true)
    submitForm('ranking', formRanking)
      .then(() => {
        router.push(`/ranking/${formRanking.slug}`)
      })
  }, [formRanking, router])
  
  const handleChange = useCallback((key: string) => (event: SyntheticEvent<HTMLInputElement, ChangeEvent>, newValue: string) => {
    if(!event) return

    const value = (event.target as any).value || newValue
    const newFormValues = {...structuredClone(formValues), [key]: value}
    
    if(key === 'name') {
      const creatorSlug = newFormValues['creatorSlug']
      const nameSlug = (newFormValues['name'] || '').toLowerCase().split(' ').join('-')
      newFormValues['slug'] = `${creatorSlug}-${nameSlug}`
    } else if(key === 'creator') {
      const creatorSlug = creators.find(({id}) => id === value)?.slug || ''
      newFormValues['creatorSlug'] = creatorSlug
    } else if(key === 'creatorCount' || key === 'rankingCount') {
      const creatorCount = Number(newFormValues.creatorCount)
      const rankingCount = Number(newFormValues.rankingCount)
      const gameLink = new Array(creatorCount).fill(null).map((_, personIndex) => ({
        person: newFormValues.gameLink[personIndex]?.person || '',
        games: new Array(rankingCount).fill(null).map((_, gameIndex) => (
          newFormValues.gameLink[personIndex]?.games[gameIndex] || {name: '', bggId: 0, isCached: false}
        ))
      }))

      newFormValues['creatorCount'] = creatorCount
      newFormValues['rankingCount'] = rankingCount
      newFormValues['gameLink'] = gameLink
    }

    updateFormValues(newFormValues)
  }, [formValues, creators])

  const handlePersonChange = useCallback((key: string, personIndex: number, gameIndex?: number) => (event: SyntheticEvent<HTMLInputElement, ChangeEvent>, newValue: string) => {
    if(!event) return

    const value = (event.target as any).value || newValue || ''
    const newFormValues = structuredClone(formValues)

    if(key === 'name') {
      newFormValues.gameLink[personIndex].person = value
    } else if(key === 'game') {
      if(gameIndex === undefined) throw new Error('must specify gameIndex')
      newFormValues.gameLink[personIndex].games[gameIndex].name = value
      newFormValues.gameLink[personIndex].games[gameIndex].isCached = !!bggCache.getValue(value)
    } else if(key === 'bggId') {
      if(gameIndex === undefined) throw new Error('must specify gameIndex')
      newFormValues.gameLink[personIndex].games[gameIndex].bggId = Number(value)
    }

    updateFormValues(newFormValues)
  }, [formValues])

  const handleBggSelection = useCallback((bggId: number, {personIndex, gameIndex}: {personIndex: number, gameIndex: number}) => {
    const newFormValues = structuredClone(formValues)
    newFormValues.gameLink[personIndex].games[gameIndex].bggId = bggId
    bggCache.setValue(newFormValues.gameLink[personIndex].games[gameIndex].name, bggId)
    updateFormValues(newFormValues)
  }, [formValues, bggCache])

  const handlePreloadBggIds = useCallback(() => {
    const newFormValues = structuredClone(formValues)
    
    newFormValues.gameLink.forEach((person, personIndex) => 
      newFormValues.gameLink[personIndex].games.forEach((game, gameIndex) => {
        const cacheValue = bggCache.getValue(newFormValues.gameLink[personIndex].games[gameIndex].name)
        if(cacheValue) {
          newFormValues.gameLink[personIndex].games[gameIndex].bggId = cacheValue
        }
      })
    )
    updateFormValues(newFormValues)
  }, [formValues, bggCache])

  return {
    isPreview,
    isLoading,
    isFormValid,
    ranking,
    formValues,
    formRanking,
    handleChange,
    handlePersonChange,
    handleBggSelection,
    handlePreloadBggIds,
    handleSubmit,
    handleCancel,
    handleConfirm,
  }
}