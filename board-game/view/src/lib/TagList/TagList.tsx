import Link from 'next/link';

import { takeTags } from 'board-game-data/take' 
import { getDeterminantOption } from 'board-game-data/calc/getDeterminantOption' 
import { TagHighlight } from 'board-game-ui/TagHighlight';

import styles from './TagList.module.scss'

type VARIANT_TYPE = 'A'|'B'|'C'|'D'
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
            <Link href={`${linkRoot}/${tag.slug}`} className={styles.link}>
              <TagHighlight
                tag={tag}
                gamesList={gamesList}
                className={styles.item}
                variant={getDeterminantOption(tag.slug, VARIANTS) as unknown as VARIANT_TYPE} />
            </Link>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TagList;
