exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulTag {
        nodes {
          slug
        }
      }
    }  
  `)
  data.allContentfulTag.nodes.forEach(node => {
    const {slug} = node
    actions.createPage({
      path: `${slug}/`,
      component: require.resolve(`./src/pages/tag/Tag.js`),
      context: { slug },
    })
  })
}