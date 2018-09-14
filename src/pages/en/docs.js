import React from 'react'
import Link from 'gatsby-link'
import PageTransition from 'gatsby-plugin-page-transitions'

const BlogPage = ({ data }) => (
  <PageTransition>
    <div>
      <h1>Cardano Docs List</h1>
      <ul>
        <li style={{ 
          listStyleType: 'none'
        }}>
          {data.allMarkdownRemark.edges.map( post => (
            <Link to={post.node.frontmatter.path} key={post.node.id} style={{
              color: '#333',
            }}>
              <h3>{post.node.frontmatter.title}</h3>
              <small>Posted by: {post.node.frontmatter.author} | {post.node.frontmatter.date} | {post.node.frontmatter.language}</small>
              <br/>
              <br/>
              <strong>Read more ...</strong>
              <br/>
              <br/>
              <hr/>
            </Link>
            )
          )}
        </li>
      </ul>
    </div>
  </PageTransition>
)

export const pageQuery = graphql`
  query BlogIndexQueryEN {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: "en" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            path
            title
            author
            date
            language
          }
        }
      }
    }
  }
`
export default BlogPage
