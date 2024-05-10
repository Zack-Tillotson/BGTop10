import {takeTag, takeTags } from 'board-game-data/take';
import {Tag} from 'board-game-view/Tag'

export async function generateMetadata() {
  return {
    title: `Image Test | Cardboard SALAD`,
    description: `oh can't wait to see the results`,
  }
}

export default async function Index() {
  const tagSlug = `game-of-the-year-2023`
  return (
    <Tag tagSlug={tagSlug} isTestImage />
  );
}
