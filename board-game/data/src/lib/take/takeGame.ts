import { Game } from 'board-game-data'
import {query, save} from '../firebase/util'

export async function takeGame(bggId?: string) {
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