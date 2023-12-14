import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { takeGame } from 'board-game-data';
import { GameFull } from 'board-game-ui';

interface GameProps {
  params: {
    bggId: string,
  }
}

export default async function Index({params: {bggId}}: GameProps) {
  const game = await takeGame(Number(bggId))

  if(!game) throw new Error('Game not found')
  
  return (
    <PageContent title={game.name} subtitle={`(${game?.yearPublished})`}>
      <GameFull {...game} isBrief={false} />
    </PageContent>
  );
}
