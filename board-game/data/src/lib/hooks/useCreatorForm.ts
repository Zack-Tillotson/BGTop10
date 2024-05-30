'use client'

import { Creator } from '../../dataTypes'
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { submitForm } from "../fetch/submitForm";

export interface CreatorFormDataType {
  id: string,
  name: string,
  slug: string,
  description: string,
  imageAvatar: string,
  imageBanner: string,
  link: string,
}

function buildCreatorForm(creator?: Creator) {
  if(!creator) {
    return {
      id: '',
      name: '',
      slug: '',
      description: '',
      imageAvatar: '',
      imageBanner: '',
      link: '',
    }
  }
    
  return {
    id: creator.id || '',
    name: creator.name,
    slug: creator.slug,
    description: creator.description,
    imageAvatar: creator.imageAvatar,
    imageBanner: creator.imageBanner,
    link: creator.link.join(', '),
  }
}

function buildCreator(form: CreatorFormDataType, id?: string) {
  return {
    id: id || '',
    name: form.name,
    slug: form.slug,
    description: form.description,
    imageAvatar: form.imageAvatar,
    imageBanner: form.imageBanner,
    link: form.link.split(', ')
  }
}

export function useCreatorForm(creator?: Creator) {
  const creatorForm = buildCreatorForm(creator)
  const [formValues, updateFormValues] = useState(creatorForm)
  const [isPreview, updateIsPreview] = useState(false)
  const [isLoading, updateIsLoading] = useState(false)
  const router = useRouter()

  const formCreator = buildCreator(formValues, creator?.id)

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
    submitForm('creator', formCreator)
      .then(() => {
        router.push(`/creator/${formCreator.slug}`)
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
    creator,
    formValues,
    formCreator,
    handleChange,
    handleSubmit,
    handleCancel,
    handleConfirm,
  }
}