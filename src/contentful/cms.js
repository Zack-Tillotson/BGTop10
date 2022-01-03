import { createClient } from 'contentful-management'

const SPACE_ID = 'c2zc4p6tmkah' // xxx
const ENVIRONMENT_ID = 'master'
const CREATOR_ENTRY_TYPE = 'creator'

function getEnvironment(accessToken) {
  return createClient({
      accessToken,
  }).getSpace(SPACE_ID).then(space => space.getEnvironment(ENVIRONMENT_ID))
}

function getContentfulObject(rawObject) {
  return {
    fields: {
      name: {
        'en-US': rawObject.name
      },
      slug: {
        'en-US': rawObject.slug,
      },
      link: {
        'en-US': rawObject.links.split(',').map(link => link.trim()),
      },
      imageBanner: {
        'en-US': rawObject.banner,
      },
      imageAvatar: {
        'en-US': rawObject.avatar,
      },
      description: {
        'en-US': rawObject.description,
      },
      list: {
        'en-US': [],
      }
    }
  }
}

export function creatEntryCreator(accessToken, rawCreator) {
  const cleanObject = getContentfulObject(rawCreator)
  return getEnvironment(accessToken)
    .then(env => env.createEntry(CREATOR_ENTRY_TYPE, cleanObject))
}