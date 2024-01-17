import { saveRanking } from 'board-game-data/take'
import {Ranking} from 'board-game-datatypes'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const {
    contentType,
    contentObject,
  } = (await request.json()) as {contentType: string, contentObject: {id?: string}}
  
  if(contentType !== 'ranking') {
    throw new Error(`Invalid requestType, received '${contentType}' but expected 'ranking'`)
  }
  saveRanking(contentObject as Ranking)
  
  return NextResponse.json({success: true})
}
