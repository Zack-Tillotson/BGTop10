import Link from 'next/link';
import {Link as JoyLink} from '@mui/joy'
import {PageContent} from 'core-ui'
import {CreatorList} from 'board-game-view'

import styles from './page.module.scss';

interface PageProps {
  params: {
    contentType: string,
  },
}

export default async function Index({params: {contentType = 'creator'}}: PageProps) {

  const breadcrumbs = [{
    href: '/',
    display: 'Home',
  }, {
    href: `/${contentType}`,
    display: contentType,
  }]

  return (
    <PageContent 
      title={contentType} 
      subtitle={`Add, remove, and update ${contentType}s`}
      breadcrumbs={breadcrumbs}
    >
      <section className={styles.controls}>
        <Link href={`${contentType}/new`} className={styles.link}>
          New
        </Link>
      </section>
      <section>
        {contentType === 'creator' && (<CreatorList />)}
      </section>
    </PageContent>
  );
}
