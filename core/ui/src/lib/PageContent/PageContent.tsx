import Typography from '@mui/joy/Typography'

import styles from './PageContent.module.scss'
import Link from 'next/link';

export interface PageContentProps {
  title: string,
  subtitle: string,
  children: React.ReactNode,
  breadcrumbs?: {href: string, display: string}[],
}

export function PageContent({
  title,
  subtitle,
  children,
  breadcrumbs,
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
      {breadcrumbs && (
        <div className={styles.pageContent}>
          <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
            <ol>
              {breadcrumbs.map(({href, display}) => (
                <li key={href}>
                  <Link href={href}>{display}</Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  )
}

export default PageContent;
