import Typography from '@mui/joy/Typography'

import styles from './PageContent.module.scss'

/* eslint-disable-next-line */
export interface PageContentProps {
  title: string,
  subtitle: string,
  children: JSX.Element|JSX.Element[],
}

export function PageContent({
  title,
  subtitle,
  children,
}: PageContentProps) {
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.pageContent}>
          <Typography level="h1" sx={{background: '#09274e', color: 'white'}} className={styles.pageTitle}>
            {title}
          </Typography>
          <Typography sx={{background: '#09274e', color: 'white'}} className={styles.pageSubtitle}>
            {subtitle}
          </Typography>
        </div>
      </div>
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  )
}

export default PageContent;
