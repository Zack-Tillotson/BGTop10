import Typography from '@mui/joy/Typography'

import { RankedGameList, Tag } from 'board-game-data'
import {GameImageList} from '../GameImageList'

import styles from './TagHighlight.module.scss'

export interface TagHighlightProps {
  tag: Tag,
  gamesList: RankedGameList,
}

export function TagHighlight({
  tag, 
  gamesList,
}: TagHighlightProps) {

  return (
    <section className={styles.container}>
      <div className={styles.titleSection}>
        <Typography level="h2" className={styles.tagTitle}>{tag.pageTitle}</Typography>
        <Typography className={styles.tagSubtitle}>{tag.pageSubtitle}</Typography>
      </div>
      <GameImageList
        className={styles.images}
        gamesList={gamesList}
      />
    </section>
  )
}

export default TagHighlight
