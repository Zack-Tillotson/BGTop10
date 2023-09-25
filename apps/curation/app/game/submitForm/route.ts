import { Game, saveGame } from 'board-game-data'
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
