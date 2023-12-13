'use client'

import { Tag } from "../../dataTypes";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { submitForm } from "../fetch/submitForm";

export interface TagFormDataType {
  display: string,
  slug: string,
  pageTitle: string,
  pageSubtitle: string,
  introduction: string,
  priority: number,
  icon: string,
}

function buildTagForm(tag?: Tag) {
  if(!tag) {
    return {
      display: '',
      slug: '',
      pageTitle: '',
      pageSubtitle: '',
      introduction: '',
      priority: 0,
      icon: '',
    }
  }
    
  return {
    display: tag.display,
    slug: tag.slug,
    pageTitle: tag.pageTitle,
    pageSubtitle: tag.pageSubtitle,
    introduction: tag.introduction,
    priority: tag.priority,
    icon: tag.icon,
  }
}

function buildTag(form: TagFormDataType, id?: string): Tag {
  return {
    id: id || '',
    display: form.display,
    slug: form.slug,
    pageTitle: form.pageTitle,
    pageSubtitle: form.pageSubtitle,
    introduction: form.introduction,
    priority: Number(form.priority),
    icon: form.icon,
    rankedGameIds: [],
  }
}

export function useTagForm(tag?: Tag) {
  const form = buildTagForm(tag)

  const [formValues, updateFormValues] = useState(form)
  const [isPreview, updateIsPreview] = useState(false)
  const [isLoading, updateIsLoading] = useState(false)
  const router = useRouter()

  const formTag = buildTag(formValues, tag?.id)

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
    submitForm('tag', formTag)
      .then(() => {
        router.push(`/tag/${formTag.slug}`)
      })
  }
  const handleChange = (key: string) => (event: SyntheticEvent<HTMLInputElement, ChangeEvent>) => {
    const value = event.currentTarget.value
    const newFormValues = {...formValues, [key]: value}

    if(key === 'display') {
      newFormValues['slug'] = newFormValues['display'].toLowerCase().split(' ').join('-')
    }

    updateFormValues(newFormValues)
  }

  return {
    isPreview,
    isLoading,
    tag,
    formValues,
    formTag,
    handleChange,
    handleSubmit,
    handleCancel,
    handleConfirm,
  }
}