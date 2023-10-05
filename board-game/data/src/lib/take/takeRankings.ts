import {QueryOptions, query} from '../firebase/util'
import {Ranking} from '../../dataTypes'

export async function takeRankings(queryOptions?: QueryOptions) {
  const results = await query('ranking', queryOptions)
  const list = results.docs.map(doc => ({...doc.data(), id: doc.id})) as unknown as Ranking[]
  return list
}