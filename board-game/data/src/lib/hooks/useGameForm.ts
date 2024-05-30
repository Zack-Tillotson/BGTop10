'use client'

import { Game } from '../../dataTypes'
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { submitForm } from "../fetch/submitForm";
import { bggGameAttrs } from '../calc/bggGameAttrs'

export interface GameFormDataType {
  name: string,
  artist: string,
  bggId: number,
  description: string,
  image: string,
  imageThumbnail: string,
  designer: string,
  family: string,
  mechanic: string,
  publisher: string,
  playTimeAvg: number,
  playTimeMax: number,
  playTimeMin: number,
  playerCountMax: number,
  playerCountMin: number,
  yearPublished: number,
}

function convertFromString(input: string) {
  return input.split('|').map(piece => piece.trim())
}

export function buildGameForm(game?: Game) {
  if(!game) {
    return {
      name: '',
      artist: '',
      bggId: 0,
      description: '',
      image: '',
      imageThumbnail: '',
      designer: '',
      family: '',
      mechanic: '',
      publisher: '',
      playTimeAvg: 0,
      playTimeMax: 0,
      playTimeMin: 0,
      playerCountMax: 0,
      playerCountMin: 0,
      yearPublished: 0,
    }
  }
    
  return {
    name: game.name,
    artist: game.artist.join('| '),
    bggId: game.bggId || 0,
    description: game.description || '',
    image:  game.image || '',
    imageThumbnail:  game.imageThumbnail,
    designer: game.designer.join('|'),
    family: game.family.join('|'),
    mechanic: game.mechanic.join('| '),
    publisher: game.publisher.join('| '),
    playTimeAvg:  game.playTimeAvg || 0,
    playTimeMax:  game.playTimeMax || 0,
    playTimeMin:  game.playTimeMin || 0,
    playerCountMax: game.playerCountMax || 0,
    playerCountMin: game.playerCountMin || 0,
    yearPublished:  game.yearPublished || 0,
  }
}

export function buildGame(form: GameFormDataType, id?: string) {
  return {
    id: id || '',
    name: form.name,
    artist: convertFromString(form.artist),
    bggId: Number(form.bggId),
    description: form.description,
    image:  form.image,
    imageThumbnail:  form.imageThumbnail,
    designer: convertFromString(form.designer),
    family: convertFromString(form.family),
    mechanic: convertFromString(form.mechanic),
    publisher: convertFromString(form.publisher),
    playTimeAvg: Number(form.playTimeAvg),
    playTimeMax: Number(form.playTimeMax),
    playTimeMin: Number(form.playTimeMin),
    playerCountMax: Number(form.playerCountMax),
    playerCountMin: Number(form.playerCountMin),
    yearPublished: Number(form.yearPublished),
  }
}

export function useGameForm(bggId: number, game?: Game) {
  const form = buildGameForm(game)

  const [formValues, updateFormValues] = useState(form)
  const [isPreview, updateIsPreview] = useState(false)
  const [isLoading, updateIsLoading] = useState(false)
  const router = useRouter()

  const formGame = buildGame(formValues, game?.id)

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
    submitForm('game', formGame)
      .then(() => {
        router.push(`/game/${formGame.bggId}`)
      })
  }
  const handleChange = (key: string) => (event: SyntheticEvent<HTMLInputElement, ChangeEvent>) => {
    const value = event.currentTarget.value
    const newFormValues = {...formValues, [key]: value}

    updateFormValues(newFormValues)
  }

  const handleUpdateFromBgg = () => {
    const queryBggId = formValues.bggId || game?.bggId || bggId || 0
    if(!queryBggId) {
      throw new Error('BGG Id invalid. Enter BGG Id into URL or form field.')
    }
    bggGameAttrs(queryBggId)
      .then(item => {
        updateFormValues(buildGameForm(item))
      })
  }

  return {
    isPreview,
    isLoading,
    game,
    formValues,
    formGame,
    handleUpdateFromBgg,
    handleChange,
    handleSubmit,
    handleCancel,
    handleConfirm,
  }
}