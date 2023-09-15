import styles from './page.module.scss';
import {Tag} from 'board-game-view'

interface IndexProps {
  tagSlug: string,
}

export default async function Index({tagSlug = 'game-of-the-year-2021'} : IndexProps) {
  return (
    'Homepage'
  );
}
