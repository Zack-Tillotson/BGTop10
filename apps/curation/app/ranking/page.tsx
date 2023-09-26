import Link from 'next/link';
import {PageContent} from 'core-ui'
import {RankingList} from 'board-game-view'

import styles from './page.module.scss';

export default async function Index() {

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/ranking`,
    display: 'Ranking',
  }]

  return (
    <PageContent 
      title={'Ranking'} 
      subtitle={`Add, remove, and update rankings`}
      breadcrumbs={breadcrumbs}
    >
      <section className={styles.controls}>
        <Link href={`/ranking/new`} className={styles.link}>
          New
        </Link>
      </section>
      <section>
        <RankingList />
      </section>
    </PageContent>
  );
}
