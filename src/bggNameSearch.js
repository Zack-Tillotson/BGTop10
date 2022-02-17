
function searchNames(queryString = '') {
  let queryTerm = queryString
  let typeQuery = '&type=boardgame'
  let exactQuery = ''

  if(queryString.indexOf('+') >= 0) {
    queryTerm = queryTerm.replaceAll('+', '')
    typeQuery = ``
  }

  if(queryString.startsWith('"') && queryString.endsWith('"')) {
    queryTerm = queryTerm.slice(1, -1)
    exactQuery = `&exact=true`
  }

  const controller = new AbortController();
  const { signal } = controller;

  const result = fetch(`https://api.geekdo.com/xmlapi2/search?query=${queryTerm}${typeQuery}${exactQuery}`, {signal})
        .then(resp => resp.text())
        .then(stringData => {
          const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

          const data = [...xmlData.documentElement.children].map(item => {
            const nameEle = [...item.children].find(attr => attr.tagName === 'name')
            const yearEle = [...item.children].find(attr => attr.tagName === 'yearpublished')
            return {
              name: nameEle && nameEle.getAttribute('value') || '',
              bggId: item.getAttribute('id'),
              yearPublished: yearEle && yearEle.getAttribute('value') || '',
            }
          })
          return data
        })
        .catch(err => {
          console.log('Error looking up game names', err)
        })

  result.cancel = () => controller.abort()

  return result
}

export default {
  searchNames,
}