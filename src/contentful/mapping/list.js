
export function rawToContentful(raw = {}) {
  
  const {
    name = '',
    slug = '',
    link = '',
    image = '',
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
        'en-US': link,
      },
      image: {
        'en-US': image,
      },
      description: {
        'en-US': description,
      },
      listGameLink: {
        'en-US': 'TBD',
      },
      creator: {
        'en-US': 'TBD',
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