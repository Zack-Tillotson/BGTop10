import {PageContent} from 'core-ui/PageContent'
import { takeGame } from 'board-game-data/take';

import styles from './page.module.scss';
import { GameImageView } from 'board-game-view/GameImageView';

interface GameProps {
  params: {
    bggId: string,
  }
}

export default async function Index({params: {bggId}}: GameProps) {
  const game = await takeGame(Number(bggId))

  const display = game?.name || `${bggId} - Game not found`

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/game`,
    display: 'Games',
  }, {
    href: `/game/${bggId}`,
    display,
  }]

  if(!game) {
    return null
  }
  
  return (
    <PageContent title={display} subtitle="Edit game" breadcrumbs={breadcrumbs}>
      <GameImageView bggId={game.bggId} />
    </PageContent>
  );
}
