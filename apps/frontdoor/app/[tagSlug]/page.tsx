import { getTag } from 'board-game-data';
import styles from './page.module.scss';
import {Tag} from 'board-game-view'

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

export default async function Index({params: {tagSlug}} : IndexProps) {
  return (
    <Tag tagSlug={tagSlug} />
  );
}
