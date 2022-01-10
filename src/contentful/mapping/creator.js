function getEmptyObject() {
  return {
    fields: {
      name: {
        'en-US': ''
      },
      slug: {
        'en-US': ''
      },
      link: {
        'en-US': []
      },
      imageBanner: {
        'en-US': '',
      },
      imageAvatar: {
        'en-US': '',
      },
      description: {
        'en-US': '',
      },
    }
  }
}


export function rawToContentful(raw = {}, updateObject) {

  
  const {
    name = '',
    slug = '',
    links = '',
    banner = '',
    avatar = '',
    description = '',
  } = raw

  const link = links.split(',').map(link => link.trim())
  
  const updateTarget = updateObject || getEmptyObject()
  updateTarget.fields.name['en-US'] = name
  updateTarget.fields.slug['en-US'] = slug
  updateTarget.fields.link['en-US'] = link
  updateTarget.fields.imageBanner['en-US'] = banner
  updateTarget.fields.imageAvatar['en-US'] = avatar
  updateTarget.fields.description['en-US'] = description
  
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
  built.description = {description: contentful.fields.description['en-US']}
  return built
}


const built = {rawToGraphQl, rawToContentful, contentfulToGraphQl}
export default built