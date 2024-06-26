import Link from 'next/link';
import {PageContent} from 'core-ui/PageContent'

import styles from './page.module.scss';
import { takeGame } from 'board-game-data/take';
import { GameFull } from 'board-game-ui/GameFull';

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
  
  return (
    <PageContent title={display} subtitle="View game" breadcrumbs={breadcrumbs}>
      <section className={styles.controls}>
        <Link className={styles.link} href={`/game/${bggId}/edit`}>
          Edit
        </Link>
        <Link className={styles.link} href={`/game/${bggId}/images`}>
          Images
        </Link>
      </section>
      <section>
        {game && (<GameFull {...game} />)}
        {!game && ('Game not found')}
      </section>
    </PageContent>
  );
}
