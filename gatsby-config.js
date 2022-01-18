const env = process.env.NODE_ENV

require("dotenv").config({
  path: `.env.${env}`,
})

const config = {
  siteMetadata: {
    siteUrl: process.env.SITE_METADATA_SITE_URL,
    title: process.env.SITE_METADATA_SITE_TITLE,
    description: `Fun mix of board game info and top 10 lists`,
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
        excludes: ['/admin/', '/admin/**', '**/image/'],
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID,
        ],
        pluginConfig: {
          head: true,
          anonymize_ip: true,
          respectDNT: true,
        },
      },
    },
  ],
};

module.exports = config
