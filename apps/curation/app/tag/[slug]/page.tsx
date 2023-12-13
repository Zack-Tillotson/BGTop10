import Link from 'next/link';
import {Typography} from '@mui/joy'
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { takeTag } from 'board-game-data';
import { TagFull, GameImageList } from 'board-game-ui';

interface TagProps {
  params: {
    slug: string,
  }
}

export default async function Index({params: {slug}}: TagProps) {
  const {tag, gamesList} = await takeTag(slug, true)
  
  if(!tag) throw new Error('slug not found')

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
      <section className={styles.controls}>
        <Link className={styles.link} href={`/tag/${slug}/edit`}>
          Edit
        </Link>
        <Link className={styles.link} href={`/tag/${slug}/games`}>
          Update games
        </Link>
      </section>
      <section>
        <TagFull tag={tag} gamesList={gamesList} />
      </section>
      <section>
        <Typography level="h2">Images</Typography>
        <GameImageList gamesList={gamesList} />
      </section>
    </PageContent>
  );
}
