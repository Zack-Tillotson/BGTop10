import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'

import styles from './TagSummary.module.scss'
import { GamesList, Tag } from 'board-game-data';
import Link from 'next/link';

export interface TagSummaryProps {
  tag: Tag,
  gamesList: GamesList,
}

export function TagSummary({
  tag, 
  gamesList
}: TagSummaryProps) {

  return (
    <section className={styles.container}>
      <Link href={`/${tag.slug}`} className={styles.link}>
        <Typography level="h2">{tag.pageTitle}</Typography>
      </Link>
      <Typography>{tag.pageSubtitle}</Typography>
    </section>
  )
}

export default TagSummary;
