'use client'

import Button from '@mui/joy/Button'
import { Tag } from 'board-game-datatypes';
import { useTagForm } from 'board-game-data/hooks/useTagForm';
import {TagForm} from 'board-game-ui/TagForm';
import {TagFull} from 'board-game-ui/TagFull';
import { ChangeEventHandler } from 'react';

interface TagFormClientProps {
  tag?: Tag
}

export default function TagFormClient({tag}: TagFormClientProps) {
  const {
    isLoading,
    isPreview,
    formValues,
    formTag,
    handleChange, 
    handleSubmit,
    handleCancel,
    handleConfirm,
  } = useTagForm(tag)
  
  return (
    <div>
      {isLoading && '...'}
      {isPreview && (
        <div>
          <TagFull tag={formTag} gamesList={[]} />
          <div>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
          </div>
        </div>
      )}
      {!isLoading && !isPreview && (
        <TagForm 
          formValues={formValues} 
          onSubmit={handleSubmit} 
          onChange={handleChange as unknown as (key: string) => ChangeEventHandler<HTMLInputElement>} 
        />
      )}
    </div>
  );
}
