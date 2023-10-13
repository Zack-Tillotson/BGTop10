import Link from 'next/link';

import styles from './GameFormView.module.scss';

import { takeGame } from 'board-game-data';
import GameFormClient from './GameFormClient';

interface GameFormViewProps {
  bggId?: number,
}

export async function GameFormView({bggId = 0}: GameFormViewProps) {
  const game = await takeGame(bggId)
  return (
    <GameFormClient bggId={bggId} game={game} />
  );
}
