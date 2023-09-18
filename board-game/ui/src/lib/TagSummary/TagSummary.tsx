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
    <section>
      <Typography level="h2">{tag.pageTitle}</Typography>
      <Typography>{tag.pageSubtitle}</Typography>
      <Link href={`/${tag.slug}`}>View the games</Link>
    </section>
  )
}

export default TagSummary;
