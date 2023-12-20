import { getStorageWriteStream } from '../firebase/storage'
import { Game } from '../../dataTypes'
import {query, save} from '../firebase/firestore'
import fetch from 'node-fetch'

export async function takeGame(bggId?: number) {
  if(!bggId) return undefined

  const results = await query('game', {query: ['bggId', '==', Number(bggId)]})
  const doc = results.docs[0]

  if(!doc) return undefined

  return {...doc.data(), id: doc.id} as Game
  
}

export async function saveGame(game: Game) {
  try {
    const {id, ...doc} = game
    await save('game', doc, id)
  } catch(e) {
    return false
  }

  return true
}

function buildSrcSet(publicUrl: string, ...sizes: number[]) {
  return sizes.reduce((srcSet, size) => ({
    ...srcSet,
    [size]: `${publicUrl.slice(0, -4)}_${size}x${size}.webp`,
  }), {})
}

export async function updateGameHostedImage(bggId: number) {
  // Get image from game data
  const game = await takeGame(bggId)

  if(!game) {
    throw new Error('No game data')
  }
  
  const {writeStream, publicUrl} = await getStorageWriteStream(`${bggId}.jpg`)  
  
  const {image} = game
  const response = await fetch(image)

  response.body?.pipe(writeStream)

  const updatedGame = {
    ...game,
    imageHosted: publicUrl,
    imageSrcSet: buildSrcSet(publicUrl, 100, 275, 550, 750),
  }
  await saveGame(updatedGame)
}