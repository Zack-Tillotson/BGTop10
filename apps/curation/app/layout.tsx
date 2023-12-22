import Link from 'next/link';
import './global.css';

import styles from './layout.module.scss'

export const metadata = {
  title: 'Curation | Cardboard SALAD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <nav className={styles.contents}>
            <Link href="/">
              <div role="presentation" aria-label="Cardboard Salad" className={styles.logo}>
                <div className={styles.logoIcon}>🥗</div>
                <div className={styles.logoTop}>Cardboard</div>
                <div className={styles.logoBottom}>Salad</div>
              </div>
            </Link>
          </nav>
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
