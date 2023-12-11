import Typography from '@mui/joy/Typography'
import Link from 'next/link'

import { RankedGameList, Tag } from 'board-game-data'
import {GameImageList} from '../GameImageList'

import styles from './TagHighlight.module.scss'

export interface TagHighlightProps {
  tag: Tag,
  gamesList: RankedGameList,
  direction: 'L2R'|'R2L',
}

export function TagHighlight({
  tag, 
  gamesList,
  direction,
}: TagHighlightProps) {

  const directionClassName = direction === 'L2R' ? styles.containerL2R : styles.containerR2L

  return (
    <section className={`${styles.container} ${directionClassName}`}>
      <div className={styles.titleSection}>
        <Link href={`/${tag.slug}`} className={styles.link}>
          <Typography level="h2">{tag.pageTitle}</Typography>
        </Link>
        <Typography>{tag.pageSubtitle}</Typography>
      </div>
      <GameImageList
        className={styles.images}
        gamesList={gamesList}
        primaryDirection="vertical"
        linkRoot={`/${tag.slug}`} 
      />
      <div className={styles.description}>
        {tag.introduction}
      </div>
    </section>
  )
}

export default TagHighlight
