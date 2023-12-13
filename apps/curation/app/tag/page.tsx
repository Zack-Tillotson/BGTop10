import Link from 'next/link';
import {PageContent} from 'core-ui'
import {TagList} from 'board-game-view'

import styles from './page.module.scss';

export default async function Index() {

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/tag`,
    display: 'Tag',
  }]

  return (
    <PageContent 
      title={'Tag'} 
      subtitle={`Add, remove, and update tags`}
      breadcrumbs={breadcrumbs}
    >
      <section className={styles.controls}>
        <Link href={`/tag/new`} className={styles.link}>
          New
        </Link>
      </section>
      <section>
        <TagList linkRoot="/tag" />
      </section>
    </PageContent>
  );
}
