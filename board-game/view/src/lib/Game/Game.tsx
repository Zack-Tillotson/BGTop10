import {PageContent} from 'core-ui/PageContent'

import { takeGame } from 'board-game-data/take';
import { GameFull } from 'board-game-ui/GameFull';

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
