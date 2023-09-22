import {PageContent} from 'core-ui'
import { takeCreator } from 'board-game-data';
import { CreatorFormView } from 'board-game-view';

import styles from './page.module.scss';

interface CreatorProps {
  params: {
    contentType: string,
    slug: string,
  }
}

export default async function Index({params: {slug, contentType}}: CreatorProps) {
  const creator = await takeCreator(slug)
  
  if(!creator) throw new Error('creator not found')

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/${contentType}`,
    display: contentType,
  }, {
    href: `/${contentType}/${slug}`,
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
