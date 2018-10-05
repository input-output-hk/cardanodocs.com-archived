module.exports = {
  siteMetadata: {
    site_title: 'Cardano Docs',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-page-transitions',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'docs'
      }
    },
    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
          // Fields to index
          fields: [
              'doc_title',
              'keywords',
              'excerpt'
          ],
          // How to resolve each field's value for a supported node type
          resolvers: {
              // For any node of type MarkdownRemark, list how to resolve the fields' values
              MarkdownRemark: {
                  title: node => node.frontmatter.doc_title,
                  keywords: node => node.frontmatter.keywords,
                  excerpt: node => node.excerpt
              },
          },
      },
    }
  ]
}
