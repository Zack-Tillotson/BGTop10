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
              <img 
                alt="Cardboard SALAD" 
                src="data:image/png;base64,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" 
              />
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
