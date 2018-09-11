import React from 'react'
import Link from 'gatsby-link'

const BlogPage = ({ data }) => (
  <div>
    <h1>Cardano Docs List</h1>
    <ul>
      <li style={{ 
        listStyleType: 'none'
      }}>
        {data.allMarkdownRemark.edges.map( post => (
          <Link to={post.node.frontmatter.path} key={post.node.id} style={{
            color: '#333',
            fontFamily: 'sans-serif'
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
)

export const pageQuery = graphql`
  query BlogIndexQueryEN {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: "en" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            author
            date
            language
          }
          excerpt
        }
      }
    }
  }
`
export default BlogPage
