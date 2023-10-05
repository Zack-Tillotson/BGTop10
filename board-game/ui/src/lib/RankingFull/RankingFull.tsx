import Typography from '@mui/joy/Typography'

import {Creator, Ranking, Tag} from 'board-game-data'

import styles from './RankingFull.module.scss'
import { CreatorBrief } from '../CreatorBrief';
import { TagBrief } from '../TagBrief';
import { Link } from '@mui/joy';

interface RankingFullProps {
  className?: string,
  ranking: Ranking,
  creator?: Creator,
  tag?: {tag: Tag},
}

export function RankingFull({
  ranking: {
    name,
    datePublished,
    description,
    image,
    link,
  },
  creator,
  tag,
  className = '',
}: RankingFullProps) {
  return (
    <div className={styles.container}>
      <Typography level="h2" className={className + ' ' + styles.name}>
        {name}
      </Typography>
      <Typography>published {datePublished}</Typography>
      {creator && (<CreatorBrief {...creator} />)}
      {tag && (<TagBrief {...tag.tag} />)}
      <img src={image} alt={'List promo'} />
      <div>
        <Typography>{description}</Typography>
        <Link target="_blank" rel="noreferrer" href={link}>Original YouTube link</Link>
      </div>
    </div>
  )
}

export default RankingFull;
