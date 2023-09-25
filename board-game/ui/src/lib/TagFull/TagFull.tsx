import Typography from '@mui/joy/Typography'

import styles from './TagFull.module.scss'
import { GamesList, Tag } from 'board-game-data';

export interface TagFullProps {
  tag: Tag,
  gamesList: GamesList,
}

export function TagFull({
  tag, 
  gamesList,
}: TagFullProps) {

  return (
    <section className={styles.container}>
      <Typography level="h2">{tag.pageTitle}</Typography>
      <Typography>{tag.pageSubtitle}</Typography>
      <Typography>{tag.introduction}</Typography>
      <Typography>{gamesList.length} games</Typography>
    </section>
  )
}

export default TagFull;
