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

export interface Tag {
  id: string,
  pageTitle: string,
  pageSubtitle: string,
  introduction: string,
  slug: string,
  display: string,
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
