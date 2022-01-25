function getEmptyObject() {
  return {
    fields: {
      display: {
        'en-US': ''
      },
      slug: {
        'en-US': ''
      },
    }
  }
}

export function rawToContentful(raw = {}, updateObject) {
  const {
    name = '',
    slug = '',
  } = raw

  const updateTarget = updateObject || getEmptyObject()
  updateTarget.fields.display['en-US'] = name
  updateTarget.fields.slug['en-US'] = slug
  
  return updateTarget
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