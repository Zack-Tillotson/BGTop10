import {PageContent} from 'core-ui'

import { takeGame } from 'board-game-data';
import { GameFull } from 'board-game-ui';

import styles from './Game.module.scss';

interface GameProps {
  bggId: string,
}

export async function Game({bggId}: GameProps) {
  const game = await takeGame(Number(bggId))

  if(!game) throw new Error('Game not found')

  return (
    <PageContent title={game.name} subtitle={`(${game?.yearPublished})`}>
      <GameFull {...game} isBrief={false} />
    </PageContent>
  );
}
