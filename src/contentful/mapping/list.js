import creatorMapper from './creator'
import gameLinksMapper from './gameLinks'

export function rawToContentful(raw = {}, rawGameLinks) {
  const {
    name = '',
    slug = '',
    link = '',
    image = '',
    description = '',
    creator = {},
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
        'en-US': gameLinksMapper.rawToGraphQl(rawGameLinks),
      },
      creator: {
        'en-US': creatorMapper.rawToGraphQl(creator),
      },
    }
  }
}

export function rawToGraphQl(...args) {
  const contentful = rawToContentful(...args)
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