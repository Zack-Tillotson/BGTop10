import Typography from '@mui/joy/Typography'

import styles from './TagTitle.module.scss'
import { Tag } from 'board-game-data';

export interface TagProps extends Partial<Tag> {
  className?: string,
}

export function TagTitle({
  pageTitle = '',
  pageSubtitle = '',
  introduction,
  className = '',
}: TagProps) {
  return (
    <section className={className}>
      <ul className={styles.tags}>
          <li><div className={styles.tag}>Top 10 list</div></li>
      </ul>
      <Typography level="h2" className={styles.title}>{pageTitle}</Typography>
      <Typography level="body-lg" className={styles.subtitle}>{pageSubtitle}</Typography>
      <div className={styles.details}>The games on this list have been calculated by aggregating many public board game rankings. They represent an overall picture of the board game scene and do not represent any one person's opinion.</div>
      <Typography level="body-md" className={styles.description}>{introduction}</Typography>
    </section>
  )
}

export default TagTitle;
