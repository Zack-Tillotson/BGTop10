import {PageContent} from 'core-ui/PageContent'
import { takeCreator } from 'board-game-data/take';
import { CreatorFormView } from 'board-game-view/CreatorFormView';

import styles from './page.module.scss';

interface CreatorProps {
  params: {
    slug: string,
  }
}

export default async function Index({params: {slug}}: CreatorProps) {
  const creator = await takeCreator(slug)
  
  if(!creator) throw new Error('creator not found')

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
      <section>
        <CreatorFormView slug={slug} />
      </section>
    </PageContent>
  );
}
