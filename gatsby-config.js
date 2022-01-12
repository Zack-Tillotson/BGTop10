const env = process.env.NODE_ENV

require("dotenv").config({
  path: `.env.${env}`,
})

const config = {
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
    },
    
  ],
};

if(env === 'production') {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "G-60P5Y2NR53",
      head: true,
      anonymize: true,
      respectDNT: true,
      exclude: ["/admin/**"],
      pageTransitionDelay: 0,
      defer: false,
      sampleRate: 5,
      siteSpeedSampleRate: 10,
      enableWebVitalsTracking: true,
    },
  })
}

module.exports = config