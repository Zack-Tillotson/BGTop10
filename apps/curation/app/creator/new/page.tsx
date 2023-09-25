import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { CreatorFormView } from 'board-game-view';

interface CreatorProps {
  params: {
    contentType: string,
  }
}

export default async function Index({params: {contentType}}: CreatorProps) {
  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/${contentType}`,
    display: contentType,
  }]

  return (
    <PageContent title={"Creator"} subtitle="New creator" breadcrumbs={breadcrumbs}>
      <section>
        <CreatorFormView />
      </section>
    </PageContent>
  );
}
