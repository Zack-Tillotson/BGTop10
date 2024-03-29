import {takeTag, takeTags } from 'board-game-data/take';
import {Tag} from 'board-game-view/Tag'

interface IndexProps {
  params: {
    tagSlug: string,
  },
}

export async function generateMetadata({params: {tagSlug}}: IndexProps) {
  const {tag} = await takeTag(tagSlug, false)
  return {
    title: `${tag?.pageTitle} | Cardboard SALAD`,
    description: tag?.pageSubtitle,
  }
}

export async function generateStaticParams() {
  const tagsWithMeta = await takeTags(false)
 
  return tagsWithMeta.map(({tag}) => ({tagSlug: tag.slug}))
}

export default async function Index({params: {tagSlug}} : IndexProps) {
  return (
    <Tag tagSlug={tagSlug} isShortList={false} />
  );
}
