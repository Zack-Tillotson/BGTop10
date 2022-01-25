function getEmptyObject(targetObject = {}) {
  
  if(!targetObject.fields) targetObject.fields = {}
  const fields = {
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
    listTags: {
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
  targetObject.fields = {...fields, ...targetObject.fields}
  return targetObject
}

export function rawToContentful(raw = {}, options = {}) {
  const {cmsCreator, cmsTags, updateObject} = options
  let {
    name = '',
    slug = '',
    link = '',
    image = '',
    datePublished = new Date().toString(),
    description = '',
    listTags = [],
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

  const updateTags = cmsTags ? cmsTags.map(cmsTag => ({
    sys: {
      id: cmsTag.sys.id,
      linkType: 'Entry',
      type: 'Link'
    },
  })) : listTags

  const updateTarget = getEmptyObject(updateObject)

  updateTarget.fields.name['en-US'] = name
  updateTarget.fields.slug['en-US'] = slug
  updateTarget.fields.link['en-US'] = link
  updateTarget.fields.datePublished['en-US'] = datePublished
  updateTarget.fields.image['en-US'] = image
  updateTarget.fields.description['en-US'] = description  
  updateTarget.fields.listTags['en-US'] = updateTags
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