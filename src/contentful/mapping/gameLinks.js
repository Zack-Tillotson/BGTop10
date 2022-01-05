import gameMapper from './game'


export function rawToContentful(raw = {}) {
  
  const {
    title = '',
    list = {},
    game = {},    
  } = raw
  
  return {
    fields: {
      title: {
        'en-US': title,
      },
      list: {
        'en-US': list,
      },
      game: {
        'en-US': game,
      },
    }
  }
}

// Form raw
function rawToGraphQl(raw = {}) {
  const builtObjects = {}
  Object.keys(raw).forEach(key => {
    const [, index, type] = key.split(' ')
    const indexObj = builtObjects[index] || {}

    if(type === 'game') {
      indexObj[type] = gameMapper.rawToGraphQl(raw[key])
    } else {
      indexObj[type] = raw[key]
    }

    builtObjects[index] = indexObj
  })
  return Object.keys(builtObjects).map(key=> builtObjects[key])
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