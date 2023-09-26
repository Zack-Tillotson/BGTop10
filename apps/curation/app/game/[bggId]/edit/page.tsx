import {PageContent} from 'core-ui'
import { takeGame } from 'board-game-data';
import { GameFormView } from 'board-game-view';

import styles from './page.module.scss';

interface GameProps {
  params: {
    bggId: string,
  }
}

export default async function Index({params: {bggId}}: GameProps) {
  const game = await takeGame(bggId)

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
  
  return (
    <PageContent title={display} subtitle="Edit game" breadcrumbs={breadcrumbs}>
      <section>
        <GameFormView bggId={bggId} />
      </section>
    </PageContent>
  );
}
