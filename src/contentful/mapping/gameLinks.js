import gameMapper from './game'

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

const built = {rawToGraphQl}
export default built