import {Ranking } from 'board-game-data'
import {query, save} from '../firebase/util'

export async function takeRanking(slug?: string) {
  if(!slug) return undefined

  const results = await query('ranking', {query: ['slug', '==', slug]})
  const doc = results.docs[0]
  
  if(!doc) return undefined

  return {...doc.data(), id: doc.id} as Ranking
  
}

export async function saveRanking(ranking: Ranking) {
  try {
    const {id, ...doc} = ranking
    await save('ranking', doc, id)
  } catch(e) {
    return false
  }

  return true
}