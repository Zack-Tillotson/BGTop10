import { Creator } from '../../dataTypes'
import {query, save} from '../firebase/util'

export async function takeCreator(slug?: string) {
  if(!slug) return undefined

  const results = await query('creator', {query: ['slug', '==', slug]})
  const doc = results.docs[0]
  
  if(!doc) return undefined

  const creator = {...doc.data(), id: doc.id} as Creator
  return creator
  
}

export async function saveCreator(creator: Creator) {
  try {
    const {id, ...creatorDoc} = creator
    await save('creator', creatorDoc, id)
  } catch(e) {
    return false
  }

  return true
}