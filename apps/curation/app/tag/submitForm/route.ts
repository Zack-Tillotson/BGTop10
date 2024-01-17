import { saveTag } from 'board-game-data/take'
import {Tag} from 'board-game-datatypes'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const {
    contentType,
    contentObject,
  } = (await request.json()) as {contentType: string, contentObject: {id?: string}}
  
  if(contentType !== 'tag') {
    throw new Error(`Invalid requestType, received '${contentType}' but expected 'tag'`)
  }
  saveTag(contentObject as Tag)
  
  return NextResponse.json({success: true})
}
