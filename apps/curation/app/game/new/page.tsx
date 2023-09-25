import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { GameFormView } from 'board-game-view';

export default async function Index() {
  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/game`,
    display: 'Games',
  }]

  return (
    <PageContent title={"Game"} subtitle="New game" breadcrumbs={breadcrumbs}>
      <section>
        <GameFormView />
      </section>
    </PageContent>
  );
}
