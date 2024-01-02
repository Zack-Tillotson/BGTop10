import {QueryOptions, query} from '../firebase/firestore'
import {Ranking} from '../../dataTypes'
import { takeCreatorById } from './takeCreator'

export async function takeRankings(queryOptions?: QueryOptions) {
  const results = await query('ranking', queryOptions)
  const list = results.docs.map(doc => ({...doc.data(), id: doc.id})) as unknown as Ranking[]

  const creators = await Promise.all(list.map(({creator}) => takeCreatorById(creator)))

  return list.map((ranking, index) => ({...ranking, creatorObj: creators[index]}))
}