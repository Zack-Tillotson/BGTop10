import { saveGame } from 'board-game-data/take'
import {Game} from 'board-game-datatypes'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const {
    contentType,
    contentObject,
  } = (await request.json()) as {contentType: string, contentObject: {id?: string}}
  
  if(contentType !== 'game') {
    throw new Error(`Invalid requestType, received '${contentType}' but expected 'game'`)
  }
  saveGame(contentObject as Game)
  
  return NextResponse.json({success: true})
}
