import Typography from '@mui/joy/Typography';
import Link from 'next/link';

import { takeCreators} from 'board-game-data/take' 
import { CreatorBrief } from 'board-game-ui/CreatorBrief';

import styles from './CreatorList.module.scss'

export async function CreatorList() {
  const list = await takeCreators({orderBy: ['name', 'asc'], maxCount: -1})

  return (
    <section>
      <Typography level="h2">List of creators ({list.length} total)</Typography>
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
