import {PageContent} from 'core-ui/PageContent'

import styles from './page.module.scss'

export async function generateMetadata() {
  return {
    title: `Cardboard SALAD`,
    description: `Contact us`,
  }
}

export default async function Index() {
  return (
    <PageContent title="Contact us">
      <p>For questions, comments, or anything else please email me:</p>
      <div className={styles.email}>CardboardSalad</div>
    </PageContent>
  );
}
