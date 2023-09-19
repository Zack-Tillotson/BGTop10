import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'

import styles from './TagSummary.module.scss'
import { Tag } from 'board-game-data';

export function TagBrief({
  display,
}: Tag) {
  return (
    <section>
      <Typography>{display}</Typography>
    </section>
  )
}

export default TagBrief;
