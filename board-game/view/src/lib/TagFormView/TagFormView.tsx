import Link from 'next/link';

import styles from './TagFormView.module.scss';

import { takeTag } from 'board-game-data';
import TagFormClient from './TagFormClient';

interface TagFormViewProps {
  slug: string,
}

export async function TagFormView({slug}: TagFormViewProps) {
  const {tag} = await takeTag(slug, false)
  return (
    <TagFormClient tag={tag} />
  );
}
