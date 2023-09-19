import { getTag } from 'board-game-data';
import styles from './page.module.scss';
import {Tag} from 'board-game-view'
import { getTags } from 'board-game/data/src/lib/fetch/queryUtil';

interface IndexProps {
  params: {
    tagSlug: string,
  },
}

export async function generateMetadata({params: {tagSlug}}: IndexProps) {
  const tag = await getTag(tagSlug)
  return {
    title: `${tag.pageTitle} | Cardboard SALAD`,
    description: tag.pageSubtitle,
  }
}

export async function generateStaticParams() {
  const tags = await getTags()
 
  return tags.map(tag => ({tagSlug: tag.slug}))
}

export default async function Index({params: {tagSlug}} : IndexProps) {
  return (
    <Tag tagSlug={tagSlug} />
  );
}
