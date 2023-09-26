export interface Ranking {
  name: string,
  datePublished: string,
  gameLink: {
    bggId: number,
    index: number,
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

export interface Tag {
  id: string,
  pageTitle: string,
  pageSubtitle: string,
  introduction: string,
  slug: string,
  display: string,
  priority: number,
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

export type ContentTypeLabel = 'tag'|'game'|'creator'|'list'
