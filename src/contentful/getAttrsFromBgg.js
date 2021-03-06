
function getSafeValue(item, getter, defaultValue = '') {
  let value = defaultValue
  try {
    value = getter(item)
  } catch (e) {}
  return value
}

// lol bgg wut
function cleanText(text) {
  const ele = document.createElement('html')
  ele.innerHTML = text
  ele.innerHTML = ele.innerText
  return ele.innerText
}

function getAttrsFromBgg(id) {
return fetch(`https://api.geekdo.com/xmlapi2/thing?id=${id}`)
  .then(resp => resp.text())
  .then(stringData => {
    const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

    const item = [...xmlData.documentElement.children].find(ele => ele.tagName === 'item')

    const cleanDesc = cleanText(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'description').innerHTML))

    const retItem = {
      bggId: Number(id),
      name: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'name' && attr.getAttribute('type') === 'primary').getAttribute('value')),
      yearPublished: Number(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'yearpublished').getAttribute('value'), 0)),
      image: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'image').innerHTML),
      imageThumbnail: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'thumbnail').innerHTML),
      artist: getSafeValue(item, item => [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgameartist'), []).map(pub => pub.getAttribute('value')),
      publisher: getSafeValue(item, item => [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamepublisher'), []).map(pub => pub.getAttribute('value')),
      designer: getSafeValue(item, item => [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamedesigner'), []).map(pub => pub.getAttribute('value')),
      family: getSafeValue(item, item => [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamefamily'), []).map(pub => pub.getAttribute('value')),
      mechanic: getSafeValue(item, item => [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamemechanic'), []).map(pub => pub.getAttribute('value')),
      playerCountMin: Number(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'minplayers').getAttribute('value'))),
      playerCountMax: Number(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'maxplayers').getAttribute('value'))),
      playTimeMin: Number(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'minplaytime').getAttribute('value'))),
      playTimeMax: Number(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'maxplaytime').getAttribute('value'))),
      playTimeAvg: Number(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'playingtime').getAttribute('value'))),
      description: cleanDesc,
    }
    return retItem
  })
  .catch(e => {
    console.log('Unable to parse BGG item', e)
  })
}

export default getAttrsFromBgg