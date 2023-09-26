import {PageContent} from 'core-ui'
import { takeRanking } from 'board-game-data';
import { RankingFormView } from 'board-game-view';

import styles from './page.module.scss';

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
    <PageContent title={display} subtitle="Edit ranking" breadcrumbs={breadcrumbs}>
      <section>
        <RankingFormView slug={slug} />
      </section>
    </PageContent>
  );
}
