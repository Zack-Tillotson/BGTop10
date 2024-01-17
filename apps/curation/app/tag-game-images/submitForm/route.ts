import { takeTag, updateGameHostedImage } from 'board-game-data/take'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const {
    contentType,
    contentObject,
  } = (await request.json()) as {contentType: string, contentObject: {id?: string}}
  
  
  if(contentType !== 'tag-game-images') {
    throw new Error(`Invalid requestType, received '${contentType}' but expected 'tag-game-images'`)
  }
  
  const {id: slug} = contentObject
  
  if(!slug) {
    throw new Error(`Invalid tag slug, received ${contentObject}`)
  }

  const {gamesList} = await takeTag(slug, true, false)
  
  for(let i = 0 ; i < gamesList.length ; i++) {
    const {game: {bggId}} = gamesList[i]
    await updateGameHostedImage(Number(bggId))
  }
  
  return NextResponse.json({success: true})
}

