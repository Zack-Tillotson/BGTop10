import {QueryOptions, query} from '../firebase/firestore'
import {Creator} from '../../dataTypes'

export async function takeCreators(queryOptions?: QueryOptions) {
  const results = await query('creator', queryOptions)
  const list = results.docs.map(doc => ({...doc.data(), id: doc.id})) as Creator[]
  return list
}