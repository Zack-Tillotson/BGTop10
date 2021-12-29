const env = process.env.NODE_ENV
console.log('\n\n Loading dotenv config - ' + env)

require("dotenv").config({
  path: `.env.${env}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://bgtop10.web.app",
    title: "BG Top 10",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-root-import",
    "gatsby-plugin-image",
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        stages: [env === 'development' ? 'DRAFT' : 'PUBLISHED'],
      },
    },
  ],
};
