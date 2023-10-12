export interface Ranking {
  id: string,
  creator: string,
  name: string,
  slug: string,
  datePublished: string,
  image: string,
  link: string,
  description: string,
  tag: string,
  gameLink: {
    person: string,
    games: number[],
  }[],
}

export interface Game {
  id: string,
  bggId: number,
  name: string,
  description: string,
  yearPublished: number,
  designer: string[],
  publisher: string[],
  artist: string[],
  playerCountMin: number,
  playerCountMax: number,
  image: string,
  imageThumbnail: string,
}

export type RankedGameIdList = {bggId: number, count: number}[]
export type RankedGameList = {game: Game, count: number}[]

export interface Tag {
  id: string,
  pageTitle: string,
  pageSubtitle: string,
  introduction: string,
  slug: string,
  display: string,
  priority: number,
  rankedGameIds: RankedGameIdList,
  rankedGames?: RankedGameList,
}

export interface Creator {
  id: string,
  slug: string,
  name: string,
  description: string,
  imageAvatar: string,
  imageBanner: string,
  link: string[],
}

export type ContentTypeLabel = 'tag'|'game'|'creator'|'ranking'