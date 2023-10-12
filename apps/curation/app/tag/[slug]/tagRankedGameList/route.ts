import { RankedGameIdList, buildGamesForTag, getGameListFromIds, saveGamesForTag } from 'board-game-data'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const start = request.url.indexOf('/tag/') + 5
    const end = request.url.indexOf('/tagRankedGameList')
    const slug = request.url.slice(start, end)
    
    const gameIdList = await buildGamesForTag(slug)
    const gameList = await getGameListFromIds(gameIdList)

    return NextResponse.json({result: true, gameList})
  } catch(e) {
    console.log('tagRankedGameList', e)
    return NextResponse.json({result: false, gameList: []})
  }
}

export async function POST(request: Request) {
  try {
    const start = request.url.indexOf('/tag/') + 5
    const end = request.url.indexOf('/tagRankedGameList')
    const slug = request.url.slice(start, end)

    const gameIdList = (await request.json()) as RankedGameIdList
    
    const result = await saveGamesForTag(slug, gameIdList)
    
    return NextResponse.json({result})
  } catch(e) {
    console.log('tagRankedGameList', e)
    return NextResponse.json({result: false})
  }
}
