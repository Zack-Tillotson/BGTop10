function getEmtpyObject() {
  return {
    fields: {
      name: {
        'en-US': ''
      },
      bggId: {
        'en-US': 0,
      },
      yearPublished: {
        'en-US': 0,
      },
      publisher: {
        'en-US': [],
      },
      artist: {
        'en-US': [],
      }, 
      designer: {
        'en-US': [],
      },
      family: {
        'en-US': [],
      },
      image: {
        'en-US': '',
      },
      imageThumbnail: {
        'en-US': '',
      },
      mechanic: {
        'en-US': [],
      },
      playerCountMax: {
        'en-US': 0,
      },
      playerCountMin: {
        'en-US': 0,
      },
      playTimeMin: {
        'en-US': 0,
      },
      playTimeMax: {
        'en-US': 0,
      },
      playTimeAvg: {
        'en-US': 0,
      },
      description: {
        'en-US': '',
      },
    }
  }
}


export function rawToContentful(raw = {}, options = {}) {
  const {
    targetObject = getEmtpyObject(),
  } = options
  
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
    description = '',
    playTimeMin = 0,
    playTimeMax = 0,
    playTimeAvg = 0,
  } = raw
  
  targetObject.fields.name = {['en-US']: name}
  targetObject.fields.bggId = {['en-US'] : Number(bggId)}
  targetObject.fields.yearPublished = {['en-US'] : Number(yearPublished)}
  targetObject.fields.publisher = {['en-US'] : publisher}
  targetObject.fields.artist = {['en-US'] : artist}
  targetObject.fields.designer = {['en-US'] : designer}
  targetObject.fields.family = {['en-US'] : family}
  targetObject.fields.image = {['en-US'] : image}
  targetObject.fields.imageThumbnail = {['en-US'] : imageThumbnail}
  targetObject.fields.mechanic = {['en-US']: mechanic}
  targetObject.fields.playerCountMax = {['en-US'] : playerCountMax}
  targetObject.fields.playerCountMin = {['en-US'] : playerCountMin}
  targetObject.fields.description = {['en-US'] : description}
  targetObject.fields.playTimeMin = {['en-US'] : playTimeMin}
  targetObject.fields.playTimeMax = {['en-US'] : playTimeMax}
  targetObject.fields.playTimeAvg = {['en-US'] : playTimeAvg}

  return targetObject
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