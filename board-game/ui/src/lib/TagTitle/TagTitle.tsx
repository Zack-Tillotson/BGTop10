import Typography from '@mui/joy/Typography'
import {GameSummary} from 'board-game-ui'

import styles from './TagSummary.module.scss'
import { Tag } from 'board-game-data';

export interface TagProps extends Tag {
  className: string,
}

export function TagTitle({
  pageTitle,
  pageSubtitle,
  introduction,
  className = '',
}: TagProps) {
  return (
    <section className={className}>
      <Typography level="body-lg">{introduction}</Typography>
    </section>
  )
}

export default TagTitle;
