import Link from 'next/link';
import {PageContent} from 'core-ui/PageContent'

import styles from './page.module.scss';
import { RankingFormView } from 'board-game-view/RankingFormView';

export default async function Index() {
  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/ranking`,
    display: 'Rankings',
  }]

  return (
    <PageContent title={"Ranking"} subtitle="New ranking" breadcrumbs={breadcrumbs}>
      <section>
        <RankingFormView />
      </section>
    </PageContent>
  );
}
