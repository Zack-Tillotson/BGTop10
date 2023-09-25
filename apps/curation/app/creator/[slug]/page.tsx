import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { takeCreator } from 'board-game-data';
import { CreatorFull } from 'board-game-ui';

interface CreatorProps {
  params: {
    slug: string,
  }
}

export default async function Index({params: {slug}}: CreatorProps) {
  const creator = await takeCreator(slug)
  
  if(!creator) throw new Error('slug not found')

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/creator`,
    display: 'Creators',
  }, {
    href: `/creator/${slug}`,
    display: creator.name,
  }]
  
  return (
    <PageContent title={creator.name} subtitle="View creator" breadcrumbs={breadcrumbs}>
      <section className={styles.controls}>
        <Link className={styles.link} href={`/creator/${slug}/edit`}>
          Edit
        </Link>
      </section>
      <section>
        <CreatorFull {...creator} />
      </section>
    </PageContent>
  );
}
