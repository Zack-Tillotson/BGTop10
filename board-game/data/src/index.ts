export * from './lib/fetch/useTagData'
export * from './lib/calc/tagGameList'

export interface List {
  name: string,
  gameLink: {
    bggId: number,
    index: number,
  }[],
  datePublished: string,
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

