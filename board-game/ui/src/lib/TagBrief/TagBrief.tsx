import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'

import styles from './TagSummary.module.scss'
import { Tag } from 'board-game-data';

export function TagBrief({
  pageTitle,
  pageSubtitle,
  introduction,
}: Tag) {
  return (
    <section>
      <Typography>{introduction}</Typography>
    </section>
  )
}

export default TagBrief;
