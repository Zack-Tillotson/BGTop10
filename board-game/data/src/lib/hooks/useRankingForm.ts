'use client'

import { Ranking } from "board-game-data";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { submitForm } from "../fetch/submitForm";

export interface RankingForm extends Ranking {
  id: string,
}

function buildRankingForm(ranking?: Ranking) {
  if(!ranking) {
    return {
      id: '',
      name: '',
      slug: '',
      datePublished: '',
    }
  }
    
  return {
    id: ranking.id,
    name: ranking.name,
    slug: ranking.slug,
    datePublished: ranking.datePublished,
  }
}

function buildRanking(form: RankingForm, id?: string) {
  return {
    id: id || '',
    name: form.name,
    slug: form.slug,
    datePublished: form.datePublished,
  }
}

export function useRankingForm(ranking?: Ranking) {
  const rankingForm = buildRankingForm(ranking)
  const [formValues, updateFormValues] = useState(rankingForm)
  const [isPreview, updateIsPreview] = useState(false)
  const [isLoading, updateIsLoading] = useState(false)
  const router = useRouter()

  const formRanking = buildRanking(formValues, ranking?.id)

  const handleSubmit = (event:  SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault()
    updateIsPreview(true)
  }

  const handleCancel = () => {
    updateIsPreview(false)
  }

  const handleConfirm = () => {
    updateIsPreview(false)
    updateIsLoading(true)
    submitForm('ranking', formRanking)
      .then(() => {
        router.push(`/ranking/${formRanking.slug}`)
      })
  }
  const handleChange = (key: string) => (event: SyntheticEvent<HTMLInputElement, ChangeEvent>) => {
    const value = event.currentTarget.value
    const newFormValues = {...formValues, [key]: value}

    if(key === 'name') {
      newFormValues['slug'] = newFormValues['name'].toLowerCase().split(' ').join('-')
    }

    updateFormValues(newFormValues)
  }

  return {
    isPreview,
    isLoading,
    ranking,
    formValues,
    formRanking,
    handleChange,
    handleSubmit,
    handleCancel,
    handleConfirm,
  }
}