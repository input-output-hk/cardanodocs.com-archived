module.exports = {
  siteMetadata: {
    title: 'Cardano Docs',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'docs'
      }
    },
    'gatsby-transformer-remark'
  ],
}
