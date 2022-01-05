
export function rawToContentful(raw = {}) {
  
  const {
    name = '',
    slug = '',
    links = '',
    banner = '',
    avatar = '',
    description = '',
  } = raw
  
  return {
    fields: {
      name: {
        'en-US': name
      },
      slug: {
        'en-US': slug,
      },
      link: {
        'en-US': links.split(',').map(link => link.trim()),
      },
      imageBanner: {
        'en-US': banner,
      },
      imageAvatar: {
        'en-US': avatar,
      },
      description: {
        'en-US': description,
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
  built.description = {description: contentful.fields.description['en-US']}
  return built
}


const built = {rawToGraphQl, rawToContentful, contentfulToGraphQl}
export default built