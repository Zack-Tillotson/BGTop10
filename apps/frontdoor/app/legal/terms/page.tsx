import {PageContent} from 'core-ui/PageContent'
import styles from './page.module.scss'

export async function generateMetadata() {
  return {
    title: `Cardboard SALAD`,
    description: `Terms of use`,
  }
}

export default async function Index() {
  return (
    <PageContent title="Terms of use" subtitle="Let's hope it doesn't come to this">
      This site is intended to be used for entertainment purposes only and should not be taken too seriously. If you have a problem with the content or usability of the site please <a href="/legal/contact-us/">Contact Us</a>.
    </PageContent>
  );
}
