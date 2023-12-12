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
  const tagLink = `/${tag.slug}`

  return (
    <section className={`${styles.container} ${directionClassName}`}>
      <div className={styles.titleSection}>
        <Link href={tagLink} className={styles.link}>
          <Typography level="h2" className={styles.tagTitle}>{tag.pageTitle}</Typography>
        </Link>
        <Typography>{tag.pageSubtitle}</Typography>
      </div>
      <GameImageList
        className={styles.images}
        gamesList={gamesList}
        primaryDirection="vertical"
        linkRoot={tagLink} 
      />
      <div className={styles.description}>
        <p>
          {tag.introduction}
        </p>
        <div>
          <Link className={styles.link + ' ' + styles.cta} href={tagLink}>
            <Typography level="body-lg" className={styles.tagTitle}>See the full list →</Typography>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TagHighlight
