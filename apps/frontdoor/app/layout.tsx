import Script from 'next/script'
import Link from 'next/link';

import './reset.css'
import './global.scss'
import styles from './layout.module.scss'

import { ScrollToTop } from 'core-ui';

export const metadata = {
  title: 'Cardboard SALAD',
  description: 'Ranking the best board games annually',
};

const gTagCode = process.env.NODE_ENV === 'production' ? `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FDCF5PR7L4');
  ` : ''

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FDCF5PR7L4"
          strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive">
          {gTagCode}
        </Script>
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
        <footer role="contentinfo">
          <section className={styles.upperFooter}>
            <ScrollToTop />
          </section>
          <section className={styles.lowerFooter}>
            <div className={styles.contents}>
              <ul className={styles.simpleUl}>
                <li className={styles.simpleLi}><a href="/legal/terms/">Terms of use</a></li>
                <li className={styles.simpleLi}><a href="/legal/contact-us/">Contact us</a></li>              
              </ul>
              <div className={styles.copyright}>
                © Copyright 2021-2024 Zachery Tillotson
              </div>
            </div>
          </section>
        </footer>
      </body>
    </html>
  );
}
