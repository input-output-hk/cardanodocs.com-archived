import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'

const BlogPage = ({ data }) => (
  <PageTransition>
    <div>
      <h1>Cardano Docs List 你好</h1>
      <ul className='list-group list-group-flush'>
        {data.allMarkdownRemark.edges.map( post => (
              <li className='list-group-item' key={post.node.id} style={{ 
                listStyleType: 'none'
              }}>
                <Link to={post.node.frontmatter.path} key={post.node.id}>
                  <h3>{post.node.frontmatter.doc_title}</h3>
                  <small>Posted by: {post.node.frontmatter.author} | {post.node.frontmatter.date} | {post.node.frontmatter.language}</small>
                  <br/>
                  <br/>
                  <strong>Read more ...</strong>
                  <br/>
                  <br/>
                  <hr/>
                </Link>
              </li>
              )
            )}
      </ul>
    </div>
  </PageTransition>
)

export const pageQuery = graphql`
  query BlogIndexQueryCN {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: "cn" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            doc_title
            author
            date
            language
            label
            keywords
          }
          excerpt
        }
      }
    }
  }
`

export default BlogPage
