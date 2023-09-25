import Link from 'next/link';

import styles from './CreatorFormView.module.scss';

import { takeTag } from 'board-game-data';
import TagFormClient from './TagFormClient';

interface TagFormViewProps {
  slug?: string,
}

export async function TagFormView({slug}: TagFormViewProps) {
  const {tag} = await takeTag(slug)
  return (
    <TagFormClient tag={tag} />
  );
}
