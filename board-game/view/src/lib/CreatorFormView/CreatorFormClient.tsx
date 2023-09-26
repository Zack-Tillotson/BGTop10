'use client'

import {Button} from '@mui/joy'
import { useCreatorForm, Creator } from 'board-game-data/client';
import { CreatorForm, CreatorFull } from 'board-game-ui';
import { ChangeEventHandler } from 'react';

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
