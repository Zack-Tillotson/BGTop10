import {takeTag, takeTags } from 'board-game-data/take';
import {RankingList} from 'board-game-view/RankingList'

interface IndexProps {
  params: {
    tagSlug: string,
  },
}

export async function generateMetadata({params: {tagSlug}}: IndexProps) {
  const {tag} = await takeTag(tagSlug, false)
  return {
    title: `Rankings for ${tag?.pageTitle} | Cardboard SALAD`,
    description: `This is the list of Top 10 rankings used to determine the overall ${tag?.pageTitle || 'Best games'}`,
  }
}

export async function generateStaticParams() {
  const tagsWithMeta = await takeTags(false)
 
  return tagsWithMeta.map(({tag}) => ({tagSlug: tag.slug}))
}

export default async function Index({params: {tagSlug}} : IndexProps) {
  return (
    <RankingList tagSlug={tagSlug} />
  );
}
