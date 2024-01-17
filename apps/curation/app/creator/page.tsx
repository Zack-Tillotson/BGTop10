import Link from 'next/link';
import {PageContent} from 'core-ui/PageContent'
import {CreatorList} from 'board-game-view/CreatorList'

import styles from './page.module.scss';

export default async function Index() {

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/creator`,
    display: 'Creator',
  }]

  return (
    <PageContent 
      title={'Creator'} 
      subtitle={`Add, remove, and update creators`}
      breadcrumbs={breadcrumbs}
    >
      <section className={styles.controls}>
        <Link href={`/creator/new`} className={styles.link}>
          New
        </Link>
      </section>
      <section>
        <CreatorList />
      </section>
    </PageContent>
  );
}
