import Link from 'next/link';

import styles from './CreatorFormView.module.scss';

import { takeCreator } from 'board-game-data/take';
import CreatorFormClient from './CreatorFormClient';

interface CreatorFormViewProps {
  slug?: string,
}

export async function CreatorFormView({slug}: CreatorFormViewProps) {
  const creator = await takeCreator(slug)
  return (
    <CreatorFormClient creator={creator} />
  );
}
