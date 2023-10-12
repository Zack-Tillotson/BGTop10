import {PageContent} from 'core-ui'
import { takeTag } from 'board-game-data';
import { TagGameListForm } from 'board-game-view';
import { TagBrief } from 'board-game-ui';

import styles from './page.module.scss';

interface TagProps {
  params: {
    slug: string,
  }
}

export default async function Index({params: {slug}}: TagProps) {
  const {tag} = await takeTag(slug, false)
  
  if(!tag) throw new Error('tag not found')

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/tag`,
    display: 'Tags',
  }, {
    href: `/tag/${slug}`,
    display: tag.display,
  }]
  
  return (
    <PageContent title={tag.display} subtitle="View tag" breadcrumbs={breadcrumbs}>
      <section>
        <TagBrief key={...tag} />
      </section>
      <section>
        <TagGameListForm slug={slug} />
      </section>
    </PageContent>
  );
}
