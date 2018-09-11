import React from 'react';
import Link from 'gatsby-link';

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <Link to='/docs'>{`< `}Go back</Link>
      <hr/>
      <h1>{post.frontmatter.title}</h1>
      <h4>By {post.frontmatter.author}</h4>
      <div dangerouslySetInnerHTML={{__html: post.html}}/>
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path }}) {
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`

export default BlogPost