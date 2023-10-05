import {Ranking} from '../../dataTypes'
import {query, save} from '../firebase/util'

export async function takeRanking(slug?: string) {
  if(!slug) return undefined
  const results = await query('ranking', {query: ['slug', '==', slug]})
  const doc = results.docs[0]
  
  if(!doc) return undefined

  const ranking = {
    ...doc.data(),
    id: doc.id,
  }
  return ranking as unknown as Ranking  
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