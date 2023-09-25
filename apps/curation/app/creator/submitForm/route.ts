import { Creator, saveCreator } from 'board-game-data'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const {
    contentType,
    contentObject,
  } = (await request.json()) as {contentType: string, contentObject: {id?: string}}
  
  if(contentType !== 'creator') {
    throw new Error(`Invalid requestType, received '${contentType}' but expected 'creator'`)
  }
console.log('POST handler', contentObject.id)
  saveCreator(contentObject as Creator)
  
  return NextResponse.json({success: true})
}
