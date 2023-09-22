'use client'

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
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleConfirm}>Submit</button>
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
