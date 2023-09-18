import {query} from './firebaseUtil'
import {Tag} from './useTagData'

export async function getTag(slug: string): Promise<Tag> {
  const results = await query('tag', ['slug', '==', slug])
  const tag = results.docs[0].data() as Tag
  return tag
}

export async function getTags(): Promise<Tag[]> {
  const results = await query('tag')
  const tags = results.docs.map(doc => doc.data()) as Tag[]
  return tags
}