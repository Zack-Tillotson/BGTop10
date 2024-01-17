'use client'

import { ChangeEventHandler } from 'react';
import Button from '@mui/joy/Button'
import { CreatorForm } from 'board-game-ui/CreatorForm';
import { CreatorFull } from 'board-game-ui/CreatorFull';
import { Creator } from 'board-game-datatypes';
import { useCreatorForm } from 'board-game-data/hooks/useCreatorForm';

interface CreatorFormClientProps {
  creator?: Creator
}

export default function CreatorFormClient({creator}: CreatorFormClientProps) {
  const {
    isLoading,
    isPreview,
    formValues,
    formCreator,
    handleChange, 
    handleSubmit,
    handleCancel,
    handleConfirm,
  } = useCreatorForm(creator)
  
  return (
    <div>
      {isLoading && '...'}
      {isPreview && (
        <div>
          <CreatorFull {...formCreator} />
          <div>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
          </div>
        </div>
      )}
      {!isLoading && !isPreview && (
        <CreatorForm 
          formValues={formValues} 
          onSubmit={handleSubmit} 
          onChange={handleChange as any as (key: string) => ChangeEventHandler<HTMLInputElement>} 
        />
      )}
    </div>
  );
}
