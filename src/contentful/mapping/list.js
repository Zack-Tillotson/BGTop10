import creatorMapper from './creator'
import gameLinksMapper from './gameLinks'

export function rawToContentful(raw = {}, cmsCreator, cmsGames) {
  const {
    name = '',
    slug = '',
    link = '',
    image = '',
    description = '',
    creator = {},
    gameLink = [],
    games = [],
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
      gameLink: {
        'en-US': gameLink,
      },
      games: {
        'en-US': cmsGames ? cmsGames.map(game => ({
          sys: {
            id: game.sys.id,
            linkType: 'Entry',
            type: 'Link'
          },
        })) : games,
      },
      creator: {
        'en-US': cmsCreator ? ({
          sys: {
            id: cmsCreator.sys.id,
            linkType: 'Entry',
            type: 'Link'
          },
        }) : creator,
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