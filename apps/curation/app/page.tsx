import Link from 'next/link';
import {PageContent} from 'core-ui/PageContent'

import styles from './page.module.scss';

export default async function Index() {
  return (
    <PageContent title="Cardboard SALAD" subtitle="Curation">
      <ul>
        <li>
          <Link href="/creator">Creator</Link>
        </li>
        <li>
          <Link href="/ranking">Ranking</Link>
        </li>
        <li>
          <Link href="/tag">Tag</Link>
        </li>
        <li>
          <Link href="/game">Game</Link>
        </li>
      </ul>
    </PageContent>
  );
}
