import { Typography } from '@mui/joy';
import Link from 'next/link';

import { takeTags} from 'board-game-data' 
import { TagBrief } from 'board-game-ui';

import styles from './TagList.module.scss'

export async function TagList() {
  const list = await takeTags({orderBy: ['priority', 'desc']})

  return (
    <section>
      <Typography level="h2">List of tags ({list.length} total)</Typography>
      <ul className={styles.container}>
        {list.map(({tag}) => (
          <li key={tag.id} className={styles.li}>
            <Link href={`/tag/${tag.slug}`}>
              <TagBrief {...tag} className={styles.item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TagList;
