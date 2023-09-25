import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { TagFormView } from 'board-game-view';

export default async function Index() {
  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/tag`,
    display: 'Tags',
  }]

  return (
    <PageContent title={"Tag"} subtitle="New tag" breadcrumbs={breadcrumbs}>
      <section>
        <TagFormView />
      </section>
    </PageContent>
  );
}
