import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'

import styles from './TagSummary.module.scss'

/* eslint-disable-next-line */
export interface TagSummaryProps {
  pageTitle: string,
  pageSubtitle: string,
  introduction: string,
}

export function TagSummary({
  pageTitle,
  pageSubtitle,
  introduction,
}: TagSummaryProps) {
  return (
    <section>
      <Typography level="h2">{pageTitle}</Typography>
      <Typography>{pageSubtitle}</Typography>
      <Typography>{introduction}</Typography>
    </section>
  )
}

export default TagSummary;
