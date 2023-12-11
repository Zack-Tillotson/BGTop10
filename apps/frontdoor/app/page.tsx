import { getTag } from 'board-game-data'

import styles from './page.module.scss'

import {Home} from 'board-game-view'

export async function generateMetadata() {
  return {
    title: `Cardboard SALAD`,
    description: `Ranking the best board games annually`,
  }
}

export default async function Index() {
  return (
    <Home />
  );
}
