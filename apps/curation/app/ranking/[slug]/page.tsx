import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { takeRanking } from 'board-game-data';
import { RankingFull } from 'board-game-ui';

interface RankingProps {
  params: {
    slug: string,
  }
}

export default async function Index({params: {slug}}: RankingProps) {
  const ranking = await takeRanking(slug)

  const display = ranking?.name || `${slug} - Ranking not found`

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/ranking`,
    display: 'Rankings',
  }, {
    href: `/ranking/${slug}`,
    display,
  }]
  
  return (
    <PageContent title={display} subtitle="View ranking" breadcrumbs={breadcrumbs}>
      <section className={styles.controls}>
        <Link className={styles.link} href={`/ranking/${slug}/edit`}>
          Edit
        </Link>
      </section>
      <section>
        {ranking && (<RankingFull ranking={ranking} />)}
        {!ranking && ('Ranking not found')}
      </section>
    </PageContent>
  );
}
