import Link from 'next/link';

import { takeTags} from 'board-game-data' 
import { TagHighlight } from 'board-game-ui';

import styles from './TagList.module.scss'

const VARIANTS = ['A', 'B', 'C', 'D']

interface TagListProps {
  linkRoot?: string,
}

export async function TagList({linkRoot = ''}: TagListProps) {
  const tags = await takeTags(true, {orderBy: ['priority', 'desc']})

  return (
    <section>
      <ul className={styles.container}>
        {tags.map(({tag, gamesList}, index) => (
          <li key={tag.id} className={styles.li}>
            <Link href={`${linkRoot}/${tag.slug}`} aria-label={tag.pageTitle} className={styles.link}>
              <TagHighlight
                tag={tag}
                gamesList={gamesList}
                className={styles.item}
                variant={VARIANTS[index % VARIANTS.length]} />
            </Link>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TagList;
