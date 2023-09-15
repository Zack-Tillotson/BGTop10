import styles from './page.module.scss';
import {Tag} from 'board-game-view'

interface IndexProps {
  params: {
    tagSlug: string,
  },
}

export default async function Index({params: {tagSlug}} : IndexProps) {
  return (
    <Tag tagSlug={tagSlug} />
  );
}
