import {PageContent} from 'core-ui'
import { takeGame } from 'board-game-data';
import { GameFormView } from 'board-game-view';

import styles from './page.module.scss';

interface GameProps {
  params: {
    slug: string,
  }
}

export default async function Index({params: {slug}}: GameProps) {
  const {game} = await takeGame(slug)
  
  if(!game) throw new Error('game not found')

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/game`,
    display: 'Games',
  }, {
    href: `/game/${slug}`,
    display: game.display,
  }]
  
  return (
    <PageContent title={game.display} subtitle="View game" breadcrumbs={breadcrumbs}>
      <section>
        <GameFormView slug={slug} />
      </section>
    </PageContent>
  );
}
