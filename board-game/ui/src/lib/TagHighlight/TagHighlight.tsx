import Typography from '@mui/joy/Typography'

import { RankedGameList, Tag } from 'board-game-datatypes'
import {GameImageList} from '../GameImageList'

import styles from './TagHighlight.module.scss'

export interface TagHighlightProps {
  tag: Tag,
  gamesList: RankedGameList,
  variant: 'A'|'B'|'C'|'D',
  className?: string,
}

export function TagHighlight({
  tag, 
  gamesList,
  className = '',
  variant,
}: TagHighlightProps) {

  return (
    <section className={styles.container + ' ' + className}>
      <div className={styles.titleSection}>
        <Typography level="h2" className={styles.tagTitle}>{tag.pageTitle}</Typography>
        <Typography className={styles.tagSubtitle}>{tag.pageSubtitle}</Typography>
      </div>
      <GameImageList
        className={styles.images}
        gamesList={gamesList}
        variant={variant}
        sizes="(max-width: 500px) 100px, 275px"
      />
    </section>
  )
}

export default TagHighlight
