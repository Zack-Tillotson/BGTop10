import { updateGameHostedImage } from 'board-game-data'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const {
    contentType,
    contentObject,
  } = (await request.json()) as {contentType: string, contentObject: {id?: string}}
  
  
  if(contentType !== 'game-image') {
    throw new Error(`Invalid requestType, received '${contentType}' but expected 'game-image'`)
  }
  
  const {id: bggId} = contentObject
  
  if(!bggId) {
    throw new Error(`Invalid BGG ID, received ${contentObject}`)
  }
  
  await updateGameHostedImage(Number(bggId))
  
  return NextResponse.json({success: true})
}

