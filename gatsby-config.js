require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
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
        stages: [process.env.NODE_ENV === 'development' ? 'DRAFT' : 'PUBLISHED'],
      },
    },
  ],
};
