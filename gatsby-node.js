// Setup script-loder to pull in bootstrap js
exports.onCreateWebpackConfig = ({
  rules
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.exec\.js$/,
          use: [ 'script-loader' ]
        }
      ]
    }
  })
}

const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const postTemplate = path.resolve('src/pages/Document.js');

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            excerpt
            html
            id
            frontmatter {
              path
              doc_title
              author
              date
              language
              keywords
            }
          }
        }
      }
    }
  `).then(res => {
    if(res.errors) Promise.reject(res.errors)
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}

