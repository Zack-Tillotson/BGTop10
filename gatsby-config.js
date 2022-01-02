const env = process.env.NODE_ENV

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
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/admin/', '/admin/creator/', '/admin/list/'],
      }
    }
  ],
};