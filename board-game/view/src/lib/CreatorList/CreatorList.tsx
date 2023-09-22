import {Creator, takeCreators} from 'board-game-data' 
import { CreatorBrief } from 'board-game-ui';

import styles from './CreatorList.module.scss'
import Link from 'next/link';

export async function CreatorList() {
  const list = await takeCreators<Creator>('creator', {orderBy: ['name', 'asc']})

  return (
    <section>
      <h2>List of creators ({list.length} total)</h2>
      <ul className={styles.container}>
        {list.map(creator => (
          <li key={creator.id} className={styles.li}>
            <Link href={`/creator/${creator.slug}`}>
              <CreatorBrief {...creator} className={styles.item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CreatorList;
