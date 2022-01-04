
export function rawToContentful(raw = {}) {
  
  const {
    bggId = 0,
    name = '',
    yearPublished = '0000',
    publisher = [],
    artist = [],
    designer = [],
    family = [],
    image = '',
    imageThumbnail = '',
    mechanic = [],
    playerCountMax = 0,
    playerCountMin = 0,
  } = raw
  
  return {
    fields: {
      name: {
        'en-US': name
      },
      bggId: {
        'en-US': Number(bggId),
      },
      yearPublished: {
        'en-US': Number(yearPublished),
      },
      publisher: {
        'en-US': publisher,
      },
      artist: {
        'en-US': artist,
      }, 
      designer: {
        'en-US': designer,
      },
      family: {
        'en-US': family,
      },
      image: {
        'en-US': image,
      },
      imageThumbnail: {
        'en-US': imageThumbnail,
      },
      mechanic: {
        'en-US': mechanic,
      },
      playerCountMax: {
        'en-US': Number(playerCountMax),
      },
      playerCountMin: {
        'en-US': Number(playerCountMin),
      },
      
    }
  }
}

export function rawToGraphQl(raw) {
  const contentful = rawToContentful(raw)
  return contentfulToGraphQl(contentful)
}

export function contentfulToGraphQl(contentful) {
  const built = Object.keys(contentful.fields).reduce((sofar, key) => ({
    ...sofar,
    [key]: contentful.fields[key]['en-US'],
  }), {})
  return built
}


const built = {rawToGraphQl, rawToContentful, contentfulToGraphQl}
export default built