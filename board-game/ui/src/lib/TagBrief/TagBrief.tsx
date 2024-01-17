import Typography from '@mui/joy/Typography'

import styles from './TagBrief.module.scss'
import { Tag } from 'board-game-datatypes';

interface TagBriefProps extends Tag {
  className?: string,
}

export function TagBrief({
  display,
  className = '',
}: TagBriefProps) {
  return (
    <section className={className}>
      <Typography>{display}</Typography>
    </section>
  )
}

export default TagBrief;
