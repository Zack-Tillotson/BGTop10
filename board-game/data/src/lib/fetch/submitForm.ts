'use client'

import { ContentTypeLabel } from "../../dataTypes";

export async function submitForm(contentType: ContentTypeLabel, contentObject: {id?: string}) { 
  await fetch(`/${contentType}/submitForm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({contentType, contentObject})
  })
  
  return true
}