import Typography from '@mui/joy/Typography'

import {Creator} from 'board-game-data'

import styles from './CreatorFull.module.scss'

interface CreatorFullProps extends Creator {
  className?: string,
}

export function CreatorFull({
  name,
  imageAvatar,
  imageBanner,
  description,
  link,
  className = '',
}: CreatorFullProps) {
  return (
    <section>
      <img alt="Banner" src={imageBanner} />
      <Typography className={className} level="h2">
        {name}
      </Typography>
      <img alt="Avatar" src={imageAvatar} />
      <Typography>{description}</Typography>
      <Typography level="h3">Links</Typography>
      <ol>
        {link.map(href => (
          <li key={href}>
            <a href={href} target="_blank" rel="noreferrer">
              {href}
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default CreatorFull;
