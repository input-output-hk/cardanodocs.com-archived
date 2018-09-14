const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const postTemplate = path.resolve('src/templates/blog-post.js');

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
              title
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

