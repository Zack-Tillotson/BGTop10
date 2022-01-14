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
      datePublished: {
        'en-US': '',
      },
      image: {
        'en-US': '',
      },
      tags: {
        'en-US': [],
      },
      description: {
        'en-US': '',
      },
      creator: {
        'en-US': {},
      },
      gameLink: {
        'en-US': [],
      },
    }
  }
}

export function rawToContentful(raw = {}, options = {}) {
  const {cmsCreator, updateObject} = options
  let {
    name = '',
    slug = '',
    link = '',
    image = '',
    datePublished = new Date().toString(),
    description = '',
    tags = [],
    creator = {},
    gameLink = [],
  } = raw

  if(description instanceof Object) description = description.description

  const updateCreator = cmsCreator ? ({
    sys: {
      id: cmsCreator.sys.id,
      linkType: 'Entry',
      type: 'Link'
    },
  }) : creator

  const updateTarget = updateObject || getEmptyObject()

  updateTarget.fields.name['en-US'] = name
  updateTarget.fields.slug['en-US'] = slug
  updateTarget.fields.link['en-US'] = link
  updateTarget.fields.datePublished['en-US'] = new Date(datePublished).toISOString()
  updateTarget.fields.image['en-US'] = image
  updateTarget.fields.description['en-US'] = description  
  updateTarget.fields.tags['en-US'] = tags
  updateTarget.fields.creator['en-US'] = updateCreator
  updateTarget.fields.gameLink['en-US'] = gameLink

  return updateTarget
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
  built.description = {description: contentful.fields.description['en-US'] || ''}
  return built
}


const built = {rawToGraphQl, rawToContentful, contentfulToGraphQl}
export default built