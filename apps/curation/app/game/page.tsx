import Link from 'next/link';
import {PageContent} from 'core-ui'
import {GameSearch} from 'board-game-view'

import styles from './page.module.scss';

export default async function Index() {

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/game`,
    display: 'Game',
  }]

  return (
    <PageContent 
      title={'Game'} 
      subtitle={`Add, remove, and update games`}
      breadcrumbs={breadcrumbs}
    >
      <section className={styles.controls}>
        <Link href={`/game/new`} className={styles.link}>
          New
        </Link>
      </section>
      <section>
        <GameSearch />
      </section>
    </PageContent>
  );
}
