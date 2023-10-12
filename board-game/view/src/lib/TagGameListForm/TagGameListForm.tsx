import Link from 'next/link';

import styles from './TagFormView.module.scss';

import { takeTag } from 'board-game-data';
import TagGameListFormClient from './TagGameListFormClient';

interface TagGameListFormProps {
  slug: string,
}

export async function TagGameListForm({slug}: TagGameListFormProps) {
  const {gamesList} = await takeTag(slug, true)
  return (
    <TagGameListFormClient slug={slug} currentList={gamesList} />
  );
}
